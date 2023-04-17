const Hotel = require("../models/Hotel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Create a hotel
// @route   POST api/hotels
// @access  ADMIN
exports.createHotel = asyncHandler ( async (req, res, next) => {
    const newHotel = await Hotel.create(req.body)
    res.status(200).json(newHotel)})

// @desc    Update a hotel
// @route   POST api/hotels/:id
// @access  ADMIN
exports.updateHotel = asyncHandler (async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.id)
    if(!hotel)
        return next( new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404));
    hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, 
            {new: true,
            runValidators: true});
    res.status(200).json(hotel);})

// @desc    Delete a hotel
// @route   DELETE api/hotels/:id
// @access  ADMIN
exports.deleteHotel =  asyncHandler( async(req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);
    if(!hotel)
        return next( new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404));
    else {
        hotel.deleteOne();
    res.status(201).json({success: true})
    }})

// @desc    Find a hotel
// @route   GET api/hotels/:id
exports.getHotel = asyncHandler ( async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
    if(!hotel)
        return next( new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404));
    res.status(200).json(hotel);})

// @desc Get all Hotels
exports.getAllHotels = asyncHandler( async(req, res) => {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);})