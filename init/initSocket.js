const { eventDB } = require("../init/db");

const Team = require("../team/model");
const Room = require("../model/roomModel");

const getSocketFunction = require("../socketControllers");
//! assign teams rooms before starting?

const initSocket = (io) => {
  io.on("connection", async (socket) => {
    const team = await Team.findById(socket.handshake.query.teamId);
    if (!team) return; //! send error back?

    {
      let currentRoom;
      const session = await eventDB.startSession();
      session.startTransaction();
      try {
        if (!team.room) {
          currentRoom = await Room.findOne(
            {},
            {},
            { sort: { created_at: -1 } }
          );
          if (!currentRoom) {
            // console.log("creating first room ");
            currentRoom = new Room({
              _id: 1,
            });
          }
          if (currentRoom.teams.length >= process.env.ROOM_SIZE) {
            currentRoom = new Room({
              _id: currentRoom._id + 1,
            });
          }
          team.room = currentRoom._id;
          currentRoom.teams.push(team.id);
        } else {
          currentRoom = await Room.findById(team.room);
        }
        const found = currentRoom.connectedTeams.includes(team._id);
        if (!found) currentRoom.connectedTeams.push(team.id);

        await currentRoom.save();
        await team.save();

        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        console.error(err);
        //! disconnect socket connection
        socket.emit("retry", { retry: "abc" });
        socket.disconnect();
      } finally {
        session.endSession();
      }

      const room = await Room.populate(currentRoom, { path: "connectedTeams" });
      socket.join(team.room);

      io.in(team.room).emit("connected_teams_update", {
        teams: room.connectedTeams,
      }); //! send all teams or send the newly joined one
    }
    const { disconnect, move } = getSocketFunction(io, socket, team);

    socket.on("disconnect", disconnect);
    socket.on("move", move);
  });
};

module.exports = initSocket;
