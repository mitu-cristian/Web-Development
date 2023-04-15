const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Update an user
// @route   PUT /api/users/:id
exports.updateUser = asyncHandler (async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if(!user)
        return next( new ErrorResponse(`There is no user with the id ${req.params.id}`, 404));
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json(user);
})

// @desc    Get a SINGLE user
// @route   GET /api/users/:id
exports.getUser = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user)
        return next( new ErrorResponse(`There is no user with the id ${req.params.id}`, 404));
    res.status(200).json(user);
})

// @desc    Get ALL users
// @route   GET /api/users
exports.getAllUsers = asyncHandler( async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users);
})