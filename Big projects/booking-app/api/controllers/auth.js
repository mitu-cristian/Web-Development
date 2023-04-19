const User = require('../models/User');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register an user
// @route   POST /api/auth/register
exports.register = asyncHandler ( async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = await User.create({username, email, password});
    
    sendTokenResponse (user, 200, res);
})

// @desc    Login an user
// @route   POST /api/auth/login
exports.login = asyncHandler( async (req, res, next) => {
// Validate email and password
    if(!req.body.username || !req.body.password)
        return next(new ErrorResponse('Please provide an email and \ or a password', 400));
// Check if password matches
    const user = await User.findOne({username: req.body.username});
    if(!user)
        return next(new ErrorResponse('Invalid credentials', 401));
// Check if password matches
    const isMatch = await user.matchPassword(req.body.password);
    if(!isMatch)
        return next(new ErrorResponse('Invalid password', 401));
    
    sendTokenResponse (user, 200, res);
})

const sendTokenResponse = (user, statusCode, res) => {

// Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    
    const {password, isAdmin, ...otherDetails} = user._doc;

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({...otherDetails})
}
