const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordResetRequestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    uniqueString: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("PasswordResetRequest", passwordResetRequestSchema);