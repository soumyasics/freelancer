const UserModel = require("../User/userSchema");
const { RateFreelancerModel } = require("./rateFreelancerSchema");
const mongoose = require("mongoose");
const FreelancerModel = require("../Freelancers/freelancerSchema");

const addRating = async (req, res) => {
  try {
    const { userId, freelancerId, rating, review } = req.body;
    if (!userId || !freelancerId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (
      !mongoose.isValidObjectId(freelancerId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs.",
      });
    }

    const freelancer = await FreelancerModel.findById(freelancerId);

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer not found.",
      });
    }
    const rateFreelancer = new RateFreelancerModel({
      userId,
      freelancerId,
      rating,
      review,
    });
    await rateFreelancer.save();

    const prevRatings = await RateFreelancerModel.find({ freelancerId });
  
    const totalRates = prevRatings.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);

    freelancer.rating = totalRates / prevRatings.length;
    await freelancer.save();
    

    return res.status(200).json({
      message: "Rating added successfully",
      success: true,
      currentRating: freelancer.rating ,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRating = async (req, res) => {
  try {
    const rating = await RateFreelancerModel.find()
      .populate("userId")
      .populate("freelancerId")
      .exec();
    return res.status(200).json({
      message: "Rating fetched successfully",
      success: true,
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRatingByFreelancerId = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RateFreelancerModel.find({ freelancerId: id })
      .populate("userId")
      .populate("freelancerId")
      .exec();
    return res.status(200).json({
      message: "Rating fetched successfully",
      success: true,
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addRating, getAllRating, getAllRatingByFreelancerId };
