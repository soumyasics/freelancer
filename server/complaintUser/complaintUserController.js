const UserModel = require("../User/userSchema");
const { ComplaintUserModel } = require("./complaintUserSchema");
const mongoose = require("mongoose");
const FreelancerModel = require("../Freelancers/freelancerSchema");

const userComplaint = async (req, res) => {
  try {
    const { userId, freelancerId, complaint } = req.body;
    if (!userId || !freelancerId || !complaint) {
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
    const comFreelancer = new ComplaintUserModel({
      userId,
      freelancerId,
      complaint,
    });
    await comFreelancer.save();

    return res.status(200).json({
      message: "Complaint added successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCompliants = async (req, res) => {
  try {
    const complaints = await ComplaintUserModel.find()
      .populate("userId")
      .populate("freelancerId")
      .exec();
    return res.status(200).json({
      message: "Rating fetched successfully",
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCompliantsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const complaints = await ComplaintUserModel.find({ userId: id })
      .populate("userId")
      .populate("freelancerId")
      .exec();
    return res.status(200).json({
      message: "Compliants fetched successfully",
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  userComplaint,
  getAllCompliants,
  getAllCompliantsByUserId,
};
