const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {timestamps: true});
module.exports = mongoose.model("users", schema);
