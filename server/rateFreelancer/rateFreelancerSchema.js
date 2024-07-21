const mongoose = require("mongoose");
const RateFreelancerSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const RateFreelancerModel = mongoose.model("RateFreelancerModel", RateFreelancerSchema);
module.exports = { RateFreelancerModel };
