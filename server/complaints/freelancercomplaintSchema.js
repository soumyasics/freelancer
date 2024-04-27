const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
        freelancerId: {
            type: Schema.Types.ObjectId,
            ref: "freelancers",
            required:true
        },
        complaint: {
            type: String
        },
        actionTaken: {
            type: Boolean,
            default: false
        }
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;