const Room = require("../model/roomModel");
const Team = require("../team/model");
const Community = require("../community/model");
const Property = require("../properties/model");
module.exports = (io, socket, teamId, roomId) => {
  const disconnect = async (reason) => {
    console.log("disconnect reason", reason);
    const room = await Room.findById(roomId).populate("connectedTeams");

    room.connectedTeams = room.connectedTeams.filter(
      (t) => String(t._id) !== String(teamId)
    );

    socket.to(roomId).emit("team_left", {
      teams: room.connectedTeams,
    });
    await room.save();
  };

  const move = async (data) => {
    console.log("a move", data);
    //! save move
    const { pos } = data;
    const team = await Team.findById(teamId);
    // const room = await Room.findById(roomId);

    team.game.currentQuestion = null;
    team.game.currentQuestionTimestamp = null;
    // timestamp: req.user.game.
    team.game.canMove = false;

    console.log("pos", team.game.posIndex);
    console.log("team.rentPaidFor", team.game.rentPaidFor);

    if (data.payRent && team.game.rentPaidFor !== team.game.posIndex + 1) {
      // team.game.rentPaidFor = pos + 1;
      const amt =
        data.payRent - (data.payRent * team.game.currentReduction) / 100;

      team.game.money -= amt; //
      const oppTeam = await Team.findById(data.rentTo);
      oppTeam.game.money += amt; ////! reduction?

      await oppTeam.save();
      socket.to(roomId).emit("rent", {
        rentTo: data.rentTo,
        rentFrom: { id: team._id, name: team.teamName },
        amount: data.payRent,
      });
      socket.emit("rent", {
        rentTo: data.rentTo,
        rentFrom: { id: team._id, name: team.teamName },
        amount: data.payRent,
      });
    }
    team.game.currentReduction = 0;
    team.game.posIndex = pos;
    team.game.rentPaidFor = 0;
    // if (room.owener)
    //   socket.to(roomId).emit("player_move", {
    //     pos: pos,
    //     teamId: teamId,
    //   });
    await team.save(); //!

    //! wait for save?
    // check for not allowed
    // if (room.ownershipMap[pos + 1])
    setTimeout(async () => {
      team.game.canMove = true;
      await team.save();
      console.log("allow");
      socket.emit("allow_moving");
      // io.sockets.to(team._id).emit("allow_moving");
      // socket.emit("allow_moving");
      // socket.emit("allow_moving");
      socket.to(roomId).emit("allow_moving_same", { teamId: team._id });
    }, 3000); //! change
  };

  const corner_tile_actions = async ({ data }) => {
    console.log("corner tile", data);
    const { teams } = await Room.findById(roomId);
    const index = data.currentPos;
    let amt;
    let action;

    // Adding 2000 points on crossing starting point
    if (data.prevPos <= 39 && data.prevPos >= 32 && index >= 0 && index < 8) {
      update_balance({
        amt: 2000,
        action: "increment",
      });
    }
    // Paying Tax to Hela/Ultron
      if (index === 4 || index === 38) {
      update_balance({
        amt: 1000,
        action: "deduct",
      });
    }

    //Jail & Rest House
    if (index === 30) {
      amt = 500;
      action = "deduct";
    } else if (index === 20) {
      amt = 100 * (teams.length - 1);
      action = "deduct";
    }
    update_balance({
      amt,
      action,
    });
    socket.to(roomId).emit("corner_actions");
  };

  const update_balance = async ({ amt, action }) => {
    console.log("update balance", amt, action);
    const team = await Team.findById(teamId);

    console.log(team.game.money);
    if (action === "deduct") {
      team.game.money -= amt;
      team.game.points = 0.3 * team.game.money + 0.7 * team.game.property;
    } else {
      team.game.money += amt;
      team.game.points = 0.3 * team.game.money + 0.7 * team.game.property;
    }
    await team.save();
    socket.emit("update_balance", {
      teamMoney: team.game.money,
    });
  };

  const trigger_update_ownershipMap = async () => {
    const room = await Room.findById(roomId);
    console.log("trigger");
    // console.log("room", room);

    socket.emit("update_ownershipMap", {
      ownershipMap: room.ownershipMap,
    });
    socket.to(roomId).emit("update_ownershipMap", {
      ownershipMap: room.ownershipMap,
    });
  };

  // const move

  const getQuestion = async (data)=>{
    const ques = await Community.find({ cat: data.type });
    const i = Math.floor(Math.random() * ques.length);
    const communityQues = ques[i];
    console.log("Community Queston :- ",communityQues);
    socket.emit('community_question',{
      ques : communityQues
    })
  }

  const community = async (data) => {
    console.log("Community : --->>>> ", data);
    const communityQues = data.ques;
    const room = await Room.findById(roomId).populate("teams");
    const team = await Team.findById(teamId);
    // const teams = await room.populate("teams");
    console.log(room);
    if (communityQues.Type === "move") {
      if (communityQues.place) {
        // jail , resort ,party house
        if (communityQues.place === "jail") {
          // req.user.game.posIndex = 31;
          // req.user.save();
          socket.emit("move_frontend", {
            pos: 31,
          });
        }
      } else if (communityQues.step) {
        // move backard or forward
        console.log(data.ques.step)
        socket.emit("move_frontend", {
          pos: team.game.posIndex+communityQues.step,
        });
      }
    } else if (communityQues.Type === "balance") {
      if (communityQues.fromPeers) {
        // cut money from everyone
        // give everyone
        let cnt = 0;
        for (let i in room.teams) {
          const teamd = room.teams[i];
          if (team._id === teamd._id) {
            break;
          }
          teamd.game.money += communityQues.balance;
          teamd.save();
          cnt++;
        }
        team.game.money += cnt * communityQues.balance;
      } else {
        team.game.money += balance;
        team.save();
        // from bank ezzzzzzzzzzzzzz
      }
    } else if (communityQues.Type === "freeze") {
      // freeze for time
      setTimeout(() => {
        console.log("allow");
        socket.emit("allow_moving");
      }, 300000);
    }
  };

  const payRent = async ({ pos }) => {
    console.log("paying");

    const team = await Team.findById(teamId);
    const room = await Room.findById(roomId);
    if (pos !== team.game.posIndex) {
      console.log("returning due to index");

      return;
    }
    const property = await Property.findById(pos + 1); //! chnage
    console.log(property._id);

    if (team.game.rentPaidFor == property._id) {
      console.log("returning due to paid");
      return;
    }
    // console.log("asdnasbdkabsd,");
    // console.log("room", room);

    const ownerTeamId = room.ownershipMap[property._id];
    console.log("ownerTeamId", ownerTeamId);

    if (ownerTeamId === team._id) return;

    let amt = property.rent; //! reduction
    if (amt === undefined) {
      amt = 100;
    }
    amt = amt - (amt * team.game.currentReduction) / 100;
    const ownerTeam = await Team.findOneAndUpdate(
      { _id: ownerTeamId },
      {
        $inc: {
          "game.money": amt,
        },
      }
    );

    team.game.money -= amt;
    team.game.rentPaidFor = property._id;
    await team.save();
    console.log(team.game.rentPaidFor);
    socket.to(roomId).emit("rent", {
      rentTo: ownerTeamId,
      rentFrom: { id: team._id, name: team.teamName },
      amount: amt,
    });
    socket.emit("rent", {
      rentTo: ownerTeamId,
      rentFrom: { id: team._id, name: team.teamName },
      amount: amt,
    });
    // socket.emit("allo", {
    //   rentTo: ownerTeamId,
    //   rentFrom: { id: team._id, name: team.teamName },
    //   amount: amt,
    // });
  };
  return {
    disconnect,
    move,
    trigger_update_ownershipMap,
    getQuestion,
    corner_tile_actions,
    update_balance,
    payRent,
    community
  };
};
