const Payment = require("./paymentSchema");
const workRequest = require("../userWorkRequest/workRequestSchema");
const { default: mongoose } = require("mongoose");
const WorkRequestModel = require("../userWorkRequest/workRequestSchema");
// Function to add a payment
const addPayment = async (req, res) => {
  try {
    const { freelancerId, workId, userId, amount, accHolderName, cardNumber } =
      req.body;

    if (
      !freelancerId ||
      !workId ||
      !userId ||
      !amount ||
      !accHolderName ||
      !cardNumber
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", data: req.body });
    }

    const isAlreayPaid = await Payment.findOne({
      freelancerId: req.body.freelancerId,
      workId: req.body.workId,
      userId: req.body.userId,
    });
    if (isAlreayPaid) {
      return res
        .status(400)
        .json({ message: "You already paid for this work.", data: req.body });
    }

    const workReq = await workRequest.findById(workId);
    if (!workReq) {
      return res
        .status(400)
        .json({ message: "Work request not found.", data: req.body });
    }

    if (workReq.assignedFreelancerId) {
      return res
        .status(400)
        .json({ message: "Work is already assigned to a freelancer." });
    }
    workReq.assignedFreelancerId = freelancerId;

    const payment = new Payment({
      freelancerId,
      workId,
      userId,
      amount,
      accHolderName,
      cardNumber,
    });

    await payment.save();
    await workReq.save();
    return res
      .status(201)
      .json({ message: "Payment successful", data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Network Failed", error: "Server Error" });
  }
};

const viewAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find({})
      .populate("userId")
      .populate("workId")
      .populate("freelancerId")
      .exec();

    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: allPayments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
// Function to view payment details
const viewPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res
        .status(404)
        .json({ message: "No data", error: "Payment not found" });
    }

    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getAllPaymentsByFreelancerId = async (req, res) => {
  let freelancerId = req.params.freelancerId;
  try {
    const payments = await Payment.find({
      freelancerId: req.params.freelancerId,
    })
      .populate("userId")
      .populate("workId")
      .populate("freelancerId")
      .exec();

    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getPaymentDataByWorkId = async (req, res) => {
  try {
    const workId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(workId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid work id",
        message: "Please try again.",
      });
    }

    const workReq = await WorkRequestModel.findById(workId);

    if (!workReq) {
      return res
        .status(404)
        .json({ success: false, message: "Work request not found" });
    }

    const paymentDetails = await Payment.findOne({
      workId,
    })
      .populate("userId")
      .populate("freelancerId")
      .exec();

    if (!paymentDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    return res.status(200).json({ success: true, data: paymentDetails });
  } catch (err) {
    console.log("Error on getPaymentDataByWorkId", err);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  addPayment,
  viewPayment,
  viewAllPayments,
  getAllPaymentsByFreelancerId,
  getPaymentDataByWorkId,
};
