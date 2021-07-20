const mongoose = require('mongoose');
require('mongoose-type-url');
const { eventDB } = require('../init/db');

const questionSchema = new mongoose.Schema({
  questionLink: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  isAttempted: {
    type: Boolean,
    required: true,
    default: false,
  },
  rentReduction: {
    type: Number,
    required: true,
    default: 50,
  },
});

module.exports = eventDB.model('Question', questionSchema);
