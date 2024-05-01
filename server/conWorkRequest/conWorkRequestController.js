const ConsultancyVacencyRequestModel = require("./conWorkRequestSchema");

const createWorkRequest = async (req, res) => {
  try {
    const {
      conId,
      title,
      description,
      category,
      budget,
      deadline,
      consultancyPhoneNumber,
    } = req.body;
    if (
      !conId ||
      !title ||
      !description ||
      !category ||
      !budget ||
      !deadline ||
      !consultancyPhoneNumber
    ) {
      return res.status(401).json({ message: "All fields are required" });
    }

    if (budget <= 0) {
      return res
        .status(401)
        .json({ message: "Budget cannot be negative or zero" });
    }

    const conWorkRequest = new ConsultancyVacencyRequestModel({
      conId,
      title,
      deadline,
      description,
      category,
      budget,
      consultancyPhoneNumber
    });
    await conWorkRequest.save();
    return res
      .status(201)
      .json({ message: "Work Request created", data: conWorkRequest });
  } catch (error) {
    console.log("Error on create request", error);
    return res.status(500).json({ error });
  }
};

const getWorkRequestByUserId = async (req, res) => {
  const conId = req.params.id;
  if (!conId || conId === "undefined" || conId.length !== 24) {
    return res.status(401).json({ message: "Id is required" });
  }
  try {
    const conWorkRequest = await ConsultancyVacencyRequestModel.find({ conId });
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    return res
      .status(200)
      .json({ message: "Work request found", data: conWorkRequest });
  } catch (error) {
    console.log("Error on get work request by id", error);
    return res.status(500).json({ error });
  }
};

const getAllWorkRequest = async (req, res) => {
  try {
    const workRequests = await ConsultancyVacencyRequestModel.find({}).populate(
      "conId"
    );
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(
      id
    ).populate("conId");
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    return res
      .status(200)
      .json({ message: "Work request found", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    conWorkRequest.status = "pending";
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    conWorkRequest.status = "progress";
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    conWorkRequest.status = "completed";
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }
    conWorkRequest.status = "cancelled";
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "Work request pending", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }

    const newResponse = {
      freelancerId,
      message,
    };
    let responseArr = [...conWorkRequest.freelancerResponses, newResponse];
    conWorkRequest.freelancerResponses = responseArr;
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "Response added successfully", data: conWorkRequest });
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
    const conWorkRequest = await ConsultancyVacencyRequestModel.findById(id);
    if (!conWorkRequest) {
      return res.status(404).json({ message: "Work request can't find" });
    }

    const newResponse = {
      message,
    };
    let replayArr = [...conWorkRequest.userReplays, newResponse];
    conWorkRequest.userReplays = replayArr;
    await conWorkRequest.save();
    return res
      .status(200)
      .json({ message: "User Replay added successfully", data: conWorkRequest });
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
  workRequestUserReplay,
  getWorkRequestByUserId,
};
