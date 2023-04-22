const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Reviews = require("../models/ReviewsModel");

// @desc    Create review
// @route   POST /api/reviews
// @access  ONLY user
exports.addReview = asyncHandler (async (req, res, next) => {
    const {title, description, rating} = req.body;
    req.body.user = req.user;
    console.log(req.body.user)
    const review = await Reviews.create({title, description, rating});
    res.status(201).json({success: true, data: review})
})

// @desc    Update a review
// @route   PUT /api/reviews/
// @access  ONLY user
exports.updateReview = asyncHandler (async (req, res, user) => {
    const review = await Reviews.find({user: req.user._id})
    if(!review)
        return next(new ErrorResponse("You do not have any review.", 400));
    const updReview = await Reviews.findByIdAndUpdate(review._id, )
})