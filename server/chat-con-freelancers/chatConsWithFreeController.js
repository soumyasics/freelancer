const mongoose = require("mongoose");

const { ChatConsultancyFreelancerSchema } = require("./chatConsWithFreeSchema");

const sendMessage = async (req, res) => {
  try {
    const { message, conId, freelancerId, msgSenderType } = req.body;

    if (!message || !conId || !freelancerId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(conId) ||
      !mongoose.Types.ObjectId.isValid(freelancerId)
    ) {
      return res.status(400).json({ msg: "Invalid user or freelancer id" });
    }
    if (msgSenderType !== "freelancer" && msgSenderType !== "consultancy") {
      return res
        .status(400)
        .json({ msg: "msgSenderType must be freelancer or consultancy" });
    }
    const chatUser = new ChatConsultancyFreelancerSchema({
      message,
      conId,
      freelancerId,
      msgSenderType,
    });
    await chatUser.save();
    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { conId, freelancerId } = req.body;
    if (!conId || !freelancerId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(conId) ||
      !mongoose.Types.ObjectId.isValid(freelancerId)
    ) {
      return res.status(400).json({ msg: "Invalid user id" });
    }

    if (conId === freelancerId) {
      return res.status(400).json({ msg: "Sender and receiver can't be same" });
    }

    const messages = await ChatConsultancyFreelancerSchema.find({
      conId,
      freelancerId,
    });
    return res.status(200).json({ msg: "Fetch all messages", data: messages });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { sendMessage, getUserMessages };
