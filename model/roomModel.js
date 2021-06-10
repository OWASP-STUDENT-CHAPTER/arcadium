const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

const roomSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    // required: true,
    default: 0,
  },
  teams: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Team",
    },
  ],
  connectedTeams: [
    {
      type: mongoose.Types.ObjectId,

      ref: "Team",
    },
  ],
});

module.exports = eventDB.model("Room", roomSchema);
