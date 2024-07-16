const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
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
    qualification: {
      type: String,
      required: true,
    },
    profilepic: {
      type: Object,
    },
    dob: {
      type: Date,
    },
    jobrole: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    adminApprovedStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("freelancers", schema);
