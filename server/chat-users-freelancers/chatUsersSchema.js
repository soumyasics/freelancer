const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChatUsersSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancers",
    },
    msgSenderType: {
      enum: ["freelancer", "user"],
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatUserModel = mongoose.model("chatUsers", ChatUsersSchema);
module.exports = { ChatUserModel };
