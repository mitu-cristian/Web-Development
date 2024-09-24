const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordResetHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    passwordResetRequest: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PasswordResetRequest",
        unique: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true,
        default: "pending"
    }
});

module.exports = mongoose.model("PasswordResetHistory", passwordResetHistorySchema);