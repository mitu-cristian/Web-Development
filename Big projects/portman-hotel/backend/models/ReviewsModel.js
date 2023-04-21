const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a title for the review."]
    }
})