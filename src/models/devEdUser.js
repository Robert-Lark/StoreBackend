const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  topTen: Array,
  inCart: Array,
  Library: Array,
});

module.exports = mongoose.model('artist', artistSchema)