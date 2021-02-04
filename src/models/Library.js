const mongoose = require("mongoose");

const LibrarySchema = mongoose.Schema({
  topTen: Array,
  inCart: Array,
  Library: Array,
});

module.exports = mongoose.model("Library", LibrarySchema);
