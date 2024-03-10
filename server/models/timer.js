/** @format */

const mongoose = require("mongoose");
const TimerSchema = new mongoose.Schema({
  Timelog: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("logtime", TimerSchema);
