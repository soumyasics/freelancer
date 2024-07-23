const InterviewModel = require("./interviewSchema");
const mongoose = require("mongoose");

const scheduleInterview = async (req, res) => {
  try {
    const {
      vacencyId,
      consultancyId,
      freelancerId,
      interviewDate,
      interviewMode,
      phoneNumber,
      description,
    } = req.body;
    if (
      !vacencyId ||
      !consultancyId ||
      !freelancerId ||
      !interviewDate ||
      !interviewMode ||
      !phoneNumber ||
      !description
    ) {
      return res.status(401).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(vacencyId)) {
      return res.status(401).json({ message: "Invalid vacencyId" });
    }

    if (!mongoose.Types.ObjectId.isValid(consultancyId)) {
      return res.status(401).json({ message: "Invalid consultancyId" });
    }

    if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
      return res.status(401).json({ message: "Invalid freelancerId" });
    }
    const interview = new InterviewModel({
      vacencyId,
      consultancyId,
      freelancerId,
      interviewDate,
      interviewMode,
      phoneNumber,
      description,
    });
    await interview.save();
    return res
      .status(201)
      .json({ message: "Interview scheduled", data: interview });
  } catch (error) {
    console.log("Error on scheduling interview", error);
    return res.status(500).json({ error });
  }
};

const getAllInterviews = async (req, res) => {
  try {
    const interviews = await InterviewModel.find()
      .populate("freelancerId")
      .populate("consultancyId")
      .populate("vacencyId")
      .exec();
    return res
      .status(200)
      .json({ message: "All interviews fetched", data: interviews });
  } catch (error) {
    console.log("error on get all interviews", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getInterviewById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Id is not valid" });
  }
  try {
    const interview = await InterviewModel.findById(id)
      .populate("freelancerId")
      .populate("consultancyId")
      .populate("vacencyId")
      .exec();
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res
      .status(200)
      .json({ message: "Interview fetched successfully", data: interview });
  } catch (error) {
    console.log("Error on get interview by id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllInterviewsByFreelancerId = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Id is not valid" });
  }
  try {
    const interviews = await InterviewModel.find({freelancerId:id})
      .populate("freelancerId")
      .populate("consultancyId")
      .populate("vacencyId")
      .exec();
    if (!interviews) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res
      .status(200)
      .json({ message: "Interview fetched successfully", data: interviews });
  } catch (error) {
    console.log("Error on getAllInterviewsByFreelancerId by id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllInterviewsByConsultancyId = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Id is not valid" });
  }
  try {
    const interviews = await InterviewModel.find({consultancyId:id})
      .populate("freelancerId")
      .populate("consultancyId")
      .populate("vacencyId")
      .exec();
    if (!interviews) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res
      .status(200)
      .json({ message: "Interview fetched successfully", data: interviews });
  } catch (error) {
    console.log("Error on getAllInterviewsByFreelancerId by id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllInterviewsByVacencyId = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Id is not valid" });
  }
  try {
    const interviews = await InterviewModel.find({vacencyId:id})
      .populate("freelancerId")
      .populate("consultancyId")
      .populate("vacencyId")
      .exec();
    if (!interviews) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res
      .status(200)
      .json({ message: "Interview fetched successfully", data: interviews });
  } catch (error) {
    console.log("Error on getAllInterviewsByFreelancerId by id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  scheduleInterview,
  getAllInterviews,
  getInterviewById,
  getAllInterviewsByFreelancerId,
  getAllInterviewsByConsultancyId,
  getAllInterviewsByVacencyId,
};
