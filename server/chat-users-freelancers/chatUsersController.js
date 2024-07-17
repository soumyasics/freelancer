const mongoose = require("mongoose");

const { ChatUserModel } = require("./chatUsersSchema");

const sendMessage = async (req, res) => {
  try {
    const { message, userId, freelancerId, msgSenderType } = req.body;

    if (!message || !userId || !freelancerId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(freelancerId)
    ) {
      return res.status(400).json({ msg: "Invalid user or freelancer id" });
    }
    if (msgSenderType !== "freelancer" && msgSenderType !== "user") {
      return res
        .status(400)
        .json({ msg: "msgSenderType must be 'freelancer' or 'user'" });
    }
    const chatUser = new ChatUserModel({
      message,
      userId,
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
    const { userId, freelancerId } = req.body;
    if (!userId || !freelancerId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(freelancerId)
    ) {
      return res.status(400).json({ msg: "Invalid user id" });
    }

    if (userId === freelancerId) {
      return res.status(400).json({ msg: "Sender and receiver can't be same" });
    }

    const messages = await ChatUserModel.find({
      userId,
      freelancerId,
    });
    return res.status(200).json({ msg: "Fetch all messages", data: messages });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { sendMessage, getUserMessages };
