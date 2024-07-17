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
      required: true
    },
    consultancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultancy",
      required: true
    },
    msgSenderType: {
      enum: ["consultancy", "user"],
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatUserConsultancyModel = mongoose.model("chatUsersWithConsultancies", ChatUsersSchema);
module.exports = { ChatUserConsultancyModel };
