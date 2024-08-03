const mongoose = require("mongoose");
const { Schema } = mongoose;
const workRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    assignedFreelancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancers",
      default: null
    },
    deadline: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    lossOfPay: {
      type: Number,
      default: 0,
    },
    amountYetToPay: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "progress", "cancelled", "completed"],
      default: "pending",
    },
    freelancerResponses: [
      {
        freelancerId: {
          type: Schema.Types.ObjectId,
          ref: "freelancers",
        },
        message: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    userReplays: [
      {
        message: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const WorkRequestModel = mongoose.model("workRequest", workRequestSchema);
module.exports = WorkRequestModel;
