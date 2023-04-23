const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Hotels = require("../models/HotelsModel");

// @desc    Add a hotel
// @route   POST /api/hotel
// @access  ADMIN
exports.addHotel = asyncHandler(async(req, res, next) => {
    const hotel = await Hotels.create(req.body)
    res.status(200).json({success: true, data: hotel})
})

// @desc    Update the hotel
// @route   PUT /api/hotel
// @access  Admin
exports.updateHotel = asyncHandler( async(req, res, next) => {
    const {name,description, phone, email} = req.body;
    const hotel = await Hotels.findOne()
    const updHotel = await Hotels.findByIdAndUpdate(hotel._id, {name, description, phone, email},
        {
            new: true,
            runValidators: true
        })
    res.status(200).json({success: true, data: updHotel})
})