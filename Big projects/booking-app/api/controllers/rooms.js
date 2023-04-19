const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    create a room
// @route   /api/rooms/:id
exports.createRoom = asyncHandler (async (req, res, next) => {
    const hotelId = req.params.id;
    if(!hotelId)
        return next(new ErrorResponse(`There is no hotel with the id of ${req.params.id}`, 403));
    const savedRoom = await Room.create(req.body);
    await Hotel.findByIdAndUpdate(hotelId, {
        $push: {rooms: savedRoom._id}
    }, {
        new: true,
        runValidators: true
    })
    res.status(200).json(savedRoom);
})

// @desc    update a room
// @route   /api/rooms/:id
exports.updateRoom = asyncHandler( async (req, res, next) => {
    let room = await Room.findById(req.params.id);
    if(!room)
        return next(new ErrorResponse(`There is no room with the id of ${req.params.id}`, 403));
    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json(room);
})

// @desc    delete a room
// @route   /api/rooms/:roomId/:hotelId
exports.deleteRoom = asyncHandler( async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.hotelId);
    if(!hotel)
        return next(new ErrorResponse(`There is no hotel with the id of ${req.params.hotelId}`, 403)) 
    
        let room = await Room.findById(req.params.roomId);
    if(!room)
        return next(new ErrorResponse(`There is no room with the id of ${req.params.roomId}`, 403));
    await Hotel.findByIdAndUpdate(hotel, {
        $pull: {rooms: room._id}
    }, {
        new: true,
        runValidators: true
    })
    await room.deleteOne();
    res.status(201).json("Room has been deleted.")
})

// @desc    get a SINGLE room
// @route   /api/rooms/:id
exports.getSingleRoom = asyncHandler( async(req, res, next) => {
    let room = await Room.findById(req.params.id);
    if(!room)
        return next(new ErrorResponse(`There is no room with the id of ${req.params.id}`, 403));
    res.status(200).json(room);
})

// @desc    get ALL rooms
// @route   GET /api/rooms
exports.getAllRooms = asyncHandler (async (req, res, next) => {
    const rooms = await Room.find()
    res.status(200).json(rooms);
})

// @desc    Update room availability
// @route   PUT /api/rooms/availability/:id
exports.updateRoomAvailability = asyncHandler (async (req, res, next) => {
    let room = await Room.find({"roomNumbers._id": req.params.id})
    if(!room)
        return next(new ErrorResponse(`There is no room with the id of ${req.params.id}`, 403));
    room = await Room.updateOne({"roomNumbers._id": req.params.id}, {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates }})
    
    res.status(200).json(room);
    }
)