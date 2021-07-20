const Room = require("../model/roomModel");
const Team = require("../team/model");

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
    const team = await Team.findById(teamId);

    team.game.posIndex = data.pos;

    socket.to(roomId).emit("player_move", {
      pos: data.pos,
      teamId: teamId,
    });
    // await team.save(); //!

    //! wait for save?
    // check for not allowed
    setTimeout(() => {
      console.log("allow");
      socket.emit("allow_moving");
    }, 5000); //! change
  };

  return {
    disconnect,
    move,
  };
};
