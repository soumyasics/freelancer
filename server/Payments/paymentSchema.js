const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    amount: {
      type: Number,
      required: true,
    },
    halfAmount: {
      type: Number,
      required: true
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    lossOfPay: {
      type: Number,
      default: 0,
    },
    extraDays: {
      type: Number,
      default: 0,
    },
    workId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "workRequest",
    },
    freelancerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "freelancers",
    },
    accHolderName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    paymentCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("payments", schema);
module.exports = PaymentModel;
