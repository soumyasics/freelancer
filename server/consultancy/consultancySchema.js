const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  licenseId: {
    type: String,
    required: true,
  },
  profilepic: {
    type: Object,
    default: null,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("consultancy", schema);
