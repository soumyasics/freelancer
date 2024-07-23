const mongoose = require("mongoose");
const { Schema } = mongoose;
const workRequestSchema = new Schema(
  {
    conId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "consultancy",
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
    consultancyPhoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "selected"],
      default: "pending",
    },
    appliedFreelancers: [
      {
        freelancerId: {
          type: Schema.Types.ObjectId,
          ref: "freelancers",
          required: true
        },
        resume: {
          type: String,
          required: true
        },
        appliedAt: {
          type: Date,
          default: Date.now(),
        },
        hiringStatus: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
    selectedFreelancer: {
      type: Schema.Types.ObjectId,
      ref: "freelancers",
      default: null
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

const ConsultancyVacencyRequestModel = mongoose.model(
  "conWorkRequest",
  workRequestSchema
);
module.exports = ConsultancyVacencyRequestModel;
