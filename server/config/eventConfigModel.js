const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

const eventConfigSchema = new mongoose.Schema({
  room: {
    id: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = eventDB.model("EventConfig", eventConfigSchema);
