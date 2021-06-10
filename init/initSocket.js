const EventConfig = require("../config/eventConfigModel");
const Team = require("../team/model");
const Room = require("../model/roomModel");

const initSocket = (io) => {
  io.on("connection", async (socket) => {
    // console.log("team socket.handshake.query", socket.handshake.query.teamId);

    const team = await Team.findById(socket.handshake.query.teamId);
    if (!team) return;
    let room;
    if (!team.room) {
      let eventConfig = await EventConfig.findOne();

      if (!eventConfig) {
        eventConfig = new EventConfig();
      }

      await eventConfig.save();

      if (eventConfig.room.size > process.env.ROOM_SIZE) {
        eventConfig.room.size = 1;
        eventConfig.room.id++;

        room = new Room({
          // id: String(eventConfig.room.id),
          _id: eventConfig.room.id,
        });

        console.log(room);
        await room.save();
      } else {
        room = await Room.findOne({ _id: eventConfig.room.id });
      }

      team.room = room.id;
      room.teams.push(team.id);

      const found = room.connectedTeams.includes(team.id);
      if (!found) room.connectedTeams.push(team.id);

      eventConfig.room.size++;
      room.size++;
      await Promise.all([team.save(), eventConfig.save(), room.save()]);
    } else {
      room = await Room.findById(team.room);
      const found = room.connectedTeams.includes(team.id);
      if (!found) room.connectedTeams.push(team.id);
      await room.save();
    }

    room = await Room.populate(room, { path: "connectedTeams" });

    socket.join(team.room);

    io.in(team.room).emit("connected_teams_update", {
      teams: room.connectedTeams,
    }); //! send all teams or send the newly joined one

    socket.on("disconnect", async (reason) => {
      const room = await Room.findById(team.room).populate("connectedTeams");
      // //! mantain only active teams or all teams ?
      room.connectedTeams = room.connectedTeams.filter(
        (t) => String(t._id) !== String(team._id)
      );

      socket.to(team.room).emit("team_left", {
        teams: room.connectedTeams,
      });
      await room.save();
    });

    socket.on("move", (data) => {
      console.log("a move", data);
      //! save move
      const rID = team.room;
      // console.log('a')
      // socket.to(rID).emit("player_move", {
      socket.to(rID).emit("player_move", {
        pos: data.pos,
        teamId: team._id,
      });
    });
  });
};

module.exports = initSocket;
