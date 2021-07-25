const Room = require('../model/roomModel');
const Team = require('../team/model');
const Community=require('../community/model');

module.exports = (io, socket, teamId, roomId) => {
  const disconnect = async (reason) => {
    console.log('disconnect reason', reason);
    const room = await Room.findById(roomId).populate('connectedTeams');

    room.connectedTeams = room.connectedTeams.filter(
      (t) => String(t._id) !== String(teamId)
    );

    socket.to(roomId).emit('team_left', {
      teams: room.connectedTeams,
    });
    await room.save();
  };

  const move = async (data) => {
    console.log('a move', data);
    //! save move
    const team = await Team.findById(teamId);

    team.game.posIndex = data.pos;
    console.log(data.pos);

    socket.to(roomId).emit('player_move', {
      pos: data.pos,
      teamId: teamId,
    });
    await team.save(); //!

    //! wait for save?
    // check for not allowed
    setTimeout(() => {
      console.log('allow');
      socket.emit('allow_moving');
    }, 1500); //! change
  };

  const corner_tile_actions = async ({ data }) => {
    console.log('corner tile', data);
    const { teams } = await Room.findById(roomId);
    const index = data.currentPos;
    let amt;
    let action;

    // Paying Tax to Hela/Ultron
    if (index === 4 || index === 38) {
      update_balance({
        amt: 1000,
        action: 'deduct',
      });
    }

    // Adding 2000 points on crossing starting point
    if (data.prevPos <= 39 && data.prevPos >= 32 && index >= 0 && index < 8) {
      update_balance({
        amt: 2000,
        action: 'increment',
      });
    }

    //Jail & Rest House
    if (index === 30) {
      amt = 500;
      action = 'deduct';
    } else if (index === 20) {
      amt = 100 * (teams.length - 1);
      action = 'deduct';
    }
    update_balance({
      amt,
      action,
    });
    socket.to(roomId).emit('corner_actions');
  };

  const update_balance = async ({ amt, action }) => {
    console.log('update balance', amt, action);
    const team = await Team.findById(teamId);

    console.log(team.game.money);
    if (action === 'deduct') team.game.money -= amt;
    else team.game.money += amt;
    console.log(team.game.money);
    await team.save();
    socket.emit('update_balance', {
      teamMoney: team.game.money,
    });
  };

  const trigger_update_ownershipMap = async () => {
    const room = await Room.findById(roomId);
    console.log('trigger');
    console.log('room', room);

    socket.emit('update_ownershipMap', {
      ownershipMap: room.ownershipMap,
    });
    socket.to(roomId).emit('update_ownershipMap', {
      ownershipMap: room.ownershipMap,
    });
  };

  // const move
  
  const community=async (data) => {
    console.log("Community : --->>>> ",data);
    const ques=await Community.find({cat : data.category})
    const i=Math.floor(Math.random()*ques.length);
    const communityQues=ques[i];
    const room= await Room.findById(req.user.room).populate("teams");
    // const teams = await room.populate("teams");
    console.log(room)
    if(communityQues.type==="move"){
        if(communityQues.place){
            // jail , resort ,party house
           if(place==="jail"){
            req.user.game.posIndex=31;
            req.user.save();
            socket.emit("move_frontend",{
              pos : req.user.game.posIndex
            })
           } 
        }else if(communityQues.step){
            // move backard or forward
          req.user.game.posIndex+=communityQues.step;
          req.user.save();
          socket.emit("move_frontend",{
            pos : req.user.game.posIndex
          })
        }
    }else if(communityQues.type==="balance"){
        if(communityQues.fromPeers){
            // cut money from everyone
            // give everyone
            let cnt=0;
            for(let i in room.teams){
                const team=room.teams[i];
                if(req.user._id===team._id){
                    break;
                }
                 team.game.money+=communityQues.balance;
                 team.save();
                 cnt++;
            }
            req.user.game.money+= cnt*communityQues.balance;  
        }else{
            req.user.game.money+=balance;
            req.user.save();
            // from bank ezzzzzzzzzzzzzz
        }
    }else if(communityQues.type==="freeze"){
        // freeze for time
        setTimeout(() => {
          console.log("allow");
          socket.emit("allow_moving");
        }, 300000);
    }
  }

  return {
    disconnect,
    move,
    trigger_update_ownershipMap,
    corner_tile_actions,
    update_balance,
  };
};
