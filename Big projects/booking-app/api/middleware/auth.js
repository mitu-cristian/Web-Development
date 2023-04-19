const jwt = require('jsonwebtoken');
const asyncHandler = require ('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.verifyToken = asyncHandler (async (req, res, next) => {
    let token;

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
// Set token from Bearer Token in the header
        // token = req.headers.authorization.split(' ')[1];
    
// Uncommented => it is no longet necessary to set the token in the headers
// else 
console.log(req.cookies.token)
if(req.cookies.token)
    token = req.cookies.token;
// Make sure token exists
    if(!token)
        return next( new ErrorResponse('Not authorised to access this route', 401));
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
        next();
    }

    catch (error) {
        return next(new ErrorResponse('Not authorised to access this route', 401));
    }
})

exports.verifyUser = asyncHandler (async (req, res, next) => {
    this.verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin === true)
            next();
        else 
            return next(new ErrorResponse('You are not authorised', 403));
    })
})

exports.verifyAdmin = asyncHandler( async (req, res, next) => {
    this.verifyToken(req, res, next, () => {
        if(req.user.isAdmin === true) {
            next();
        }
        else {
            return next(new ErrorResponse('You are not authorised', 403));
        }   
            
    })
})