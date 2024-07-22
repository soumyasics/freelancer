const mongoose = require("mongoose");
const complaintUserSchema = new mongoose.Schema(
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

const ComplaintUserModel = mongoose.model(
  "ComplaintUserModel",
  complaintUserSchema
);
module.exports = { ComplaintUserModel };
