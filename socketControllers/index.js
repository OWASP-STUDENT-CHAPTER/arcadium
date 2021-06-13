const Room = require("../model/roomModel");

module.exports = (io, socket, team) => {
  const disconnect = async (reason) => {
    console.log("disconnect reason", reason);
    const room = await Room.findById(team.room).populate("connectedTeams");

    room.connectedTeams = room.connectedTeams.filter(
      (t) => String(t._id) !== String(team._id)
    );

    socket.to(team.room).emit("team_left", {
      teams: room.connectedTeams,
    });
    await room.save();
  };

  const move = (data) => {
    console.log("a move", data);
    //! save move
    const rID = team.room;
    socket.to(rID).emit("player_move", {
      pos: data.pos,
      teamId: team._id,
    });
  };

  return {
    disconnect,
    move,
  };
};
