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

  modelNumber: {
    type: Number,
    default: -1,
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
    canMove: {
      type: Boolean,
      default: true,
    },
    property: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    rentPaidFor: {
      type: Number,
      default: 0,
    },
    questionsAttempted: {
      // type: [
      //   {
      //     questions: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       // default: null,
      //       ref: "Question",
      //     },
      //     solved: {
      //       type: Boolean,
      //       defalut: false,
      //     },
      //   },
      // ],
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
      default: [],
    },
    currentQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Question",
    },
    currentQuestionTimestamp: {
      type: Date,
    },
    currentReduction: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

const Team = eventDB.model("Team", teamSchema);
module.exports = Team;
