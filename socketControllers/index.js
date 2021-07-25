const Room = require('../model/roomModel');
const Team = require('../team/model');

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

    if (
      team.game.posIndex <= 39 &&
      team.game.posIndex >= 30 &&
      (data.pos >= 0 || data.pos === 40) &&
      data.pos < 10
    ) {
      console.log(team.game.posIndex, data.pos);
      update_balance({
        amt: 2000,
        action: 'increment',
      });
    }

    team.game.posIndex = data.pos;

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
    const room = await Room.findById(roomId);
    const { teams } = room;
    const index = data.pos;
    let amt;
    let action;

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
  return {
    disconnect,
    move,
    trigger_update_ownershipMap,
    corner_tile_actions,
    update_balance,
  };
};
