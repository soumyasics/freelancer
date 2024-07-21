const mongoose = require("mongoose");
const complaintFreelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancers",
      required: true,
    },
    complaint: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ComplaintFreelancerModel = mongoose.model(
  "ComplaintFreelancerModel",
  complaintFreelancerSchema
);
module.exports = { ComplaintFreelancerModel };
