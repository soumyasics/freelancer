const Payment = require("./paymentSchema");
const workRequest = require("../userWorkRequest/workRequestSchema");

// Function to add a payment
const addPayment = async (req, res) => {
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
  try {
    // Create a new payment instance
    const payment = new Payment({
      freelancerId: req.body.freelancerId,
      workId: req.body.workId,
      userId: req.body.userId,
      amount: req.body.amount,
      accHolderName: req.body.accHolderName,
      cardNumber: req.body.cardNumber,
    });

    // Save the payment to the database
    await payment.save();

    res.status(201).json({ message: "saved", data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed", error: "Server Error" });
  }
};

const viewAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find({});

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
  console.log("freel", freelancerId)
  try {
    const payments = await Payment.find({
      freelancerId: req.params.freelancerId,
    })
      .populate("userId")
      .populate("workId")
      .populate("freelancerId")
      .exec();

    console.log("paymentss", payments);

    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
module.exports = {
  addPayment,
  viewPayment,
  viewAllPayments,
  getAllPaymentsByFreelancerId,
};
