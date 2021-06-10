const EventConfig = require("../config/eventConfigModel");
const Team = require("../team/model");
const Room = require("../model/roomModel");

const initSocket = (io) => {
  // io.on("connection ", async (socket) => {
  io.on("connection", async (socket) => {
    // console.log("socket.handshake.query");
    console.log("team socket.handshake.query", socket.handshake.query.teamId);
    // socket.join

    const team = await Team.findById(socket.handshake.query.teamId);
    console.log(1);
    if (!team) return;
    console.log(2);
    let room;
    // let connectedTeams;
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

      // console.log(room);
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
    // await ;
    // room = await room.populate("connectedTeams");
    room = await Room.populate(room, { path: "connectedTeams" });
    console.log(room);
    // return;
    // console.log("team", team);
    // console.log("room", room);
    socket.join(team.room);

    io.in(team.room).emit("testMSG", { teams: room.connectedTeams }); //! send all teams or send the newly joined one

    // console.log("room.id", team.room);
    // const connectedTeams = io.sockets.adapter.rooms.forEach((e) =>
    //   console.log(e)
    // );
    // const connectedTeams = io.sockets.adapter.rooms[team.room];
    // console.log("connected teams", connectedTeams);

    socket.on("disconnect", async (reason) => {
      console.log("disconnect reason", reason);
      console.log("leaving team", team);
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
    // await eventConfig.save();
    // await room.save();
  });

  // io.on("di")
};

module.exports = initSocket;
