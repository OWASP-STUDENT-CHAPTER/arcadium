const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

const solveSchema = new mongoose.Schema({
  email: {
    type: String,
    // default: null,
    required: true,
  },
  question: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    // default: null,
    // ref: "Question",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = eventDB.model("Solve", solveSchema);
