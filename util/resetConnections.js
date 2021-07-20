const Room = require("../model/roomModel");

module.exports = async function () {
  const res = await Room.updateMany({}, { $set: { connectedTeams: [] } });
  // console.log("connections reset, rooms effected = ", res.n);
};
