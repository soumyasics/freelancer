const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChatConsultancyFreelancerSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    conId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultancy",
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancers",
    },
    msgSenderType: {
      enum: ["freelancer", "consultancy"],
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatConWithFreelancerModel = mongoose.model(
  "chatConsultancyWithFreelancers",
  ChatConsultancyFreelancerSchema
);
module.exports = { ChatConsultancyFreelancerSchema };
