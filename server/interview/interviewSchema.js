const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    vacencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "conWorkRequest",
    },
    consultancyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "consultancy",
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "freelancers",
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    interviewMode: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applicantStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("interviewSchema", interviewSchema);
