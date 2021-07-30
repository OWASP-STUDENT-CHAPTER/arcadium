const { eventDB } = require("../init/db");

const Team = require("../team/model");
const Room = require("../model/roomModel");

const getSocketFunction = require("../socketControllers");
//! assign teams rooms before starting?
// const mapDefalut = {};
// for (let i = 1; i <= 40; i++) {
//   mapDefalut[i] = false;
// }
const initSocket = (io, app) => {
  io.on("connection", async (socket) => {
    const team = await Team.findById(socket.handshake.query.teamId);
    if (!team) return; //! send error back?

    {
      let currentRoom;
      const session = await eventDB.startSession();
      session.startTransaction();
      try {
        if (!team.room) {
          currentRoom = await Room.findOne({}, {}, { sort: { createdAt: -1 } });
          console.log("currentRoom", currentRoom);
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
          team.modelNumber = currentRoom.teams.length;
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
      socket.emit("start", { pos: team.game.posIndex });

      io.in(team.room).emit("connected_teams_update", {
        teams: room.connectedTeams,
      }); //! send all teams or send the newly joined one
    }
    const {
      disconnect,
      move,
      trigger_update_ownershipMap,
      corner_tile_actions,
      update_balance,
      payRent,
    } = getSocketFunction(io, socket, team._id, team.room);

    socket.on("disconnect", disconnect);
    socket.on("move", move);
    socket.on("trigger_update_ownershipMap", trigger_update_ownershipMap);
    socket.on("corner_tile_actions", corner_tile_actions);
    socket.on("update_balance", update_balance);
    socket.on("pay_rent", payRent);
  });
};

module.exports = initSocket;
