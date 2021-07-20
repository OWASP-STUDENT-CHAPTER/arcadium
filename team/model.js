const mongoose = require("mongoose");
const { eventDB } = require("../init/db");
const Participant = require("../baseTeam/participantModel");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Participant,
    },
  ],
  room: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    ref: "Room",
  },
  game: {
    money: {
      type: Number,
      default: 15000,
    },
    posIndex: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
});

const Team = eventDB.model("Team", teamSchema);
module.exports = Team;
