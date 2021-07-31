const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

const solveSchema = new mongoose.Schema({
  email: {
    type: String,
    // default: null,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    // default: null,
    ref: "Question",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = eventDB.model("Solve", solveSchema);
