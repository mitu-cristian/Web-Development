const Users = require("../models/UsersModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

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
            .json({success: true, data:{...otherDetails}})
    }

// @desc    register an user
// @route   POST /api/users/register
exports.registerUser = asyncHandler (async (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;
    const users = await Users.findOne({"email": email})
    if(users)
        return next(new ErrorResponse(`There is already an account registered with the email address ${email}.`))
    const user = await Users.create({firstname, lastname, email, password});
    sendTokenResponse (user, 201, res);
})

// @desc    login an user
// @route   POST /api/user/login
exports.loginUser = asyncHandler (async (req, res, next) => {
// Verifications
    if(!req.body.email && !req.body.password)
        return next(new ErrorResponse('Please provide your email address and password', 400));
    else if(!req.body.email)
        return next(new ErrorResponse('Please provide a valid email address', 400));
    else if(!req.body.password)
        return next(new ErrorResponse('Please provide your email address', 400));
    
// Check if user exists
    const user = await Users.findOne({email: req.body.email}).select("+password");
    if(!user)
        return next(new ErrorResponse('Invalid credentials', 401));
// Check if password matches
    const isMatch = await user.matchPassword(req.body.password);
    if(!isMatch)
        return next(new ErrorResponse('Invalid credentials', 401));
    sendTokenResponse(user, 200, res);
})

// @desc    logout
// @route   GET /api/users/logout
// @route   User
exports.logoutUser = asyncHandler (async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: `You have successfuly logged out.`
    })
})

// @desc    Update my user details
// @route   PUT /api/users
// @access    User
exports.updateMyUserDetails = asyncHandler(async (req, res, next) => {
    const {firstname, lastname, email} = req.body;

// Check if the user is an Admin and add the field to req.body
    if(req.user.isAdmin === true)
        req.body.isAdmin = true;
    let user = await Users.find({"email": email});
    
// If in the email input uses the same email address as in the database
if(user.length === 0 || (user.length === 1 && user[0]._id.toString() === req.user._id.toString() ))
{
        user = await Users.findByIdAndUpdate(req.user._id, {firstname, lastname, email}, {
            new: true,
            runValidators: true
        })
        res.status(200).json({success: true, data: user})
    }
    else {
        return next( new ErrorResponse(`You cannot use the email address ${email}`, 400))
    }
})

// @desc    Update my password
// @route   PUT /api/users/updatePassword
// @access  User
exports.updateMyPassword = asyncHandler( async (req, res, next) => {
    const user = await Users.findById(req.user.id).select("+password");
// Check current password
    if(!(await user.matchPassword(req.body.currentPassword)))
        return next(new ErrorResponse('Password is incorrect', 401));
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
})

// @desc    Get me
// @route   GET /api/users
// @access  User
exports.getMe = asyncHandler (async (req, res, next) => {
    res.status(200).json({success: true, data: req.user})
}) 

// @desc    Get AN user
// @route   GET /api/users/:userId
// @access  ADMIN
exports.getAnUser = asyncHandler (async (req, res, next) => {
    const user = await Users.findById(req.params.userId)
    if(!user)
        return next(new ErrorResponse(`There is no user with the id of ${req.params.userId}.`, 401));
    if(user._id.toString() === req.user.toString())
        return next(new ErrorResponse("To see the details of your admin account, please use the appropriate route.", 403));
    if(user.isAdmin === true)
        return next(new ErrorResponse("You can not see the details of another admin's account.", 403))
    else {
        res.status(200).json({success: true, data: user})
    }
})

// @desc    delete my user
// @route   DELETE /api/users
// @access  User
exports.deleteMe = asyncHandler (async (req, res, next) => {
    await req.user.deleteOne();
    res.status(200).json({success: true, message: "Your user has beeen successfuly deleted."})
})

// @desc    delete an user
// @route   DELETE /api/users/:userId
// @access  ADMIN
exports.deleteAnUser = asyncHandler (async (req, res, next) => {
    const user = await Users.findById(req.params.userId)
    if(!user)
        return next(new ErrorResponse(`There is no user with the id of ${req.params.userId}.`, 401))
    else if(user._id.toString() === req.user.toString())
// The admin can not delete his account
        return next(new ErrorResponse("To delete your admin account, please use the appropriate route.", 403))
    else if(user.isAdmin === true)
// The admin can not delete another admin's account
        return next(new ErrorResponse("You are not allowed to delete another admin's account.", 403));
    else {
        await user.deleteOne();
        res.status(200).json({success: true, message: "The user has been successfuly deleted."})
    }
})