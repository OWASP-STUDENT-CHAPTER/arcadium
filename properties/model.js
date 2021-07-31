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
  rent: {
    type: Number,
    required: true,
  },
  colorGroup: {
    type: String,
    required: true,
    enum: PROPERTY_COLORS,
  },
  type: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
    defalut: 100,
  },
});

module.exports = eventDB.model("Property", propertySchema);
