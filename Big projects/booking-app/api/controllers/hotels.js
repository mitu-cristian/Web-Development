const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Create a hotel
// @route   POST api/hotels
// @access  ADMIN
exports.createHotel = asyncHandler ( async (req, res, next) => {
    const newHotel = await Hotel.create(req.body)
    res.status(200).json(newHotel)})

// @desc    Update a hotel
// @route   POST api/hotels/find:id
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
// @route   DELETE api/hotels/find/:id
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
// @route   GET api/hotels/find/:id
exports.getHotel = asyncHandler ( async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id)
    if(!hotel)
        return next( new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404));
    res.status(200).json(hotel);})

// @desc    Get all Hotels
// @route    GET api/hotels
exports.getAllHotels = asyncHandler( async(req, res, next) => {
    const {min, max, ...others} = req.query;
    const hotels = await Hotel.find({
        ...others,
        cheapestPrice: {$gt: min || 1, $lt: max || 999}
    }).limit(req.query.limit);
    res.status(200).json(hotels);})

// @desc    Get hotels by city
// @route   GET /api/hotels/countByCity/?citite=london,madrid
exports.countByCity = asyncHandler (async (req, res, next) => {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(cities.map( city => {
        return Hotel.countDocuments({city})
    }))
    res.status(200).json(list);
})

// @desc    Get hotels by type
// @route   GET /api/hotels/countByType
exports.countByType = asyncHandler (async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({type: 'hotel'})
    const apartmentCount = await Hotel.countDocuments({type: 'apartment'})
    const resortCount = await Hotel.countDocuments({type: 'resort'})
    const villaCount = await Hotel.countDocuments({type: 'villa'})
    const cabinCount = await Hotel.countDocuments({type: 'cabin'})
    res.status(200).json([
        {type: 'hotel', count: hotelCount},
        {type: 'apartments', count: apartmentCount},
        {type: 'resorts', count: resortCount},
        {type: 'villas', count:villaCount},
        {type: 'cabins', count: cabinCount}
    ])
})

// @desc    All free rooms from a hotel
// @route   GET /api/hotels/room/:hotelId
exports.getHotelRooms = asyncHandler (async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.hotelId)
    if(!Hotel)
        return next(new ErrorResponse(`There is no hotel with the id of ${req.params.hotelId}, 403`));
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list);
})