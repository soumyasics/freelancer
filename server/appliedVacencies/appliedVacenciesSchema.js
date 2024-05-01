const mongoose = require("mongoose");

const appliedVacenciesSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Applied",
  },
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
});

module.exports = mongoose.model("appliedVacencies", appliedVacenciesSchema);
