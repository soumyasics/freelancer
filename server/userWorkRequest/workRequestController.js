const WorkRequestModel = require("./workRequestSchema");

const createWorkRequest = async (req, res) => {
  try {
    const { userId, title, description, category, budget, deadline } = req.body;
    if (!userId || !title || !description || !category || !budget || !deadline) {
      return res.status(401).json({ message: "All fields are required" });
    }


    if (budget <= 0) {
      return res.status(401).json({ message: "Budget cannot be negative or zero" });
    }

    const workRequest = new WorkRequestModel({
      userId,
      title,
      deadline,
      description,
      category,
      budget,
    });
    await workRequest.save();
    return res
      .status(201)
      .json({ message: "Work Request created", data: workRequest });
  } catch (error) {
    console.log("Error on create request", error);
    return res.status(500).json({ error });
  }
};

const getWorkRequestByUserId = async (req, res) => {
  const userId = req.params.id;
  if (!userId || userId === "undefined" || userId.length !== 24) {
    return res.status(401).json({ message: "Id is required" });
  }
  try {
    const workRequest = await WorkRequestModel.find({ userId });
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    return res
      .status(200)
      .json({ message: "Work request found", data: workRequest });
  } catch (error) {
    console.log("Error on get work request by id", error);
    return res.status(500).json({ error });
  }
}

const getAllWorkRequest = async (req, res) => {
  try {
    const workRequests = await WorkRequestModel.find({}).populate("userId");
    return res
      .status(200)
      .json({ message: "All work requests", data: workRequests });
  } catch (error) {
    console.log("Error on get all works request", error);
    return res.status(500).json({ error });
  }
};

const getWorkRequestById = async (req, res) => {
  const id = req.params.id;
  if (!id || id === "undefined" || id.length !== 24) {
    return res.status(401).json({ message: "Id is required" });
  }

  try {
    const workRequest = await WorkRequestModel.findById(id).populate("userId");
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    return res
      .status(200)
      .json({ message: "Work request found", data: workRequest });
  } catch (error) {
    console.log("Error on get work request by id", error);
    return res.status(500).json({ error });
  }
};

const makeWorkRequestPending = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }

  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    workRequest.status = "pending";
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: workRequest });
  } catch (error) {
    console.log("Error on make work request pending", error);
    return res.status(500).json({ error });
  }
};
const makeWorkRequestProgress = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }

  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    workRequest.status = "progress";
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: workRequest });
  } catch (error) {
    console.log("Error on make work request pending", error);
    return res.status(500).json({ error });
  }
};

const makeWorkRequestCompleted = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }

  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    workRequest.status = "completed";
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: workRequest });
  } catch (error) {
    console.log("Error on make work request pending", error);
    return res.status(500).json({ error });
  }
};
const makeWorkRequestCancelled = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }

  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    workRequest.status = "cancelled";
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: workRequest });
  } catch (error) {
    console.log("Error on make work request pending", error);
    return res.status(500).json({ error });
  }
};

const workRequestFreelancerResponse = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }
  const { message, freelancerId } = req.body;
  if (!message || !freelancerId) {
    return res
      .status(401)
      .json({ message: "message and freelancerId is required" });
  }
  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }

    const newResponse = {
      freelancerId,
      message,
    };
    let responseArr = [...workRequest.freelancerResponses, newResponse];
    workRequest.freelancerResponses = responseArr;
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "Response added successfully", data: workRequest });
  } catch (err) {
    console.log("Error on post work request response", err);
    return res
      .status(500)
      .json({ message: "Error on post work request response", error: err });
  }
};
const workRequestUserReplay = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({ message: "Id is required" });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(401).json({ message: "message is required" });
  }
  try {
    const workRequest = await WorkRequestModel.findById(id);
    if (!workRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }

    const newResponse = {
      message,
    };
    let replayArr = [...workRequest.userReplays, newResponse];
    workRequest.userReplays = replayArr;
    await workRequest.save();
    return res
      .status(200)
      .json({ message: "User Replay added successfully", data: workRequest });
  } catch (err) {
    console.log("Error on post work request replay", err);
    return res
      .status(500)
      .json({ message: "Error on post work request replay", error: err });
  }
};

module.exports = {
  createWorkRequest,
  getAllWorkRequest,
  getWorkRequestById,
  makeWorkRequestPending,
  makeWorkRequestProgress,
  makeWorkRequestCompleted,
  makeWorkRequestCancelled,
  workRequestFreelancerResponse,
  workRequestUserReplay,getWorkRequestByUserId
};
