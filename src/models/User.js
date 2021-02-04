const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: Number,
  tenant: String,
  connection: String,
  email: String,
  password: String,
  debug: Boolean,
  email_verified: Boolean,
  topTen: Array,
  inCart: Array,
  Library: Array,
});

module.exports = mongoose.model("User", UserSchema);
