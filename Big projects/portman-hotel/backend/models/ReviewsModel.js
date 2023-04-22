const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a title for the review."],
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, "Please add a description for the review"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "Please add a rating between 1 and 10"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "UsersModel",
        required: true
    }
}, {timestamps: true})


ReviewsSchema.pre('save', async function (next) {
    const review = this;
    console.log("A intrat aici.")
    const existingReview = await ReviewsModel.findOne({user: review.user});
    if(existingReview)
    return next(new ErrorResponse("An user can add only one review", 403))
    return next();
})

// An user can add maximum one review / bootcamp
// ReviewsSchema.index(
//     {user: 1}, {unique: true})

module.exports = mongoose.model("Reviews", ReviewsSchema)