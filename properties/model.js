const mongoose = require("mongoose");
const { eventDB } = require("../init/db");
const { PROPERTY_COLORS } = require("../util/CONSTANTS");

const propertySchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colorGroup: {
    type: String,
    required: true,
    enum: PROPERTY_COLORS,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

module.exports = eventDB.model("Property", propertySchema);