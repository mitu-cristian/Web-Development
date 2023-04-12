const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler ( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// Set token from Bearer Token in the header
        token = req.headers.authorization.split(' ')[1];
    }

// Now it looks into the cookies to check if the token is there
// Previously we added the token in the headers and the below lines were commented
// Uncommentened => it is no longer need to set the token in the headers
    // else if(req.cookies.token) {
    //     token = req.cookies.token;
    // }

    // Make sure token exists
    if(!token) {
        return next( new ErrorResponse('Not authorised to access this route', 401));
    }

    try {
// Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }

    catch(error) {
        return next( new ErrorResponse('Not authorised to access this route', 401) )
    }
})

// Grant access to specific roles
// ...roles is a comma separated roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next( new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    }
} 