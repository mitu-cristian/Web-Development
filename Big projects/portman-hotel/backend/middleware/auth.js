const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Users = require("../models/UsersModel");

exports.verifyUser = asyncHandler (async (req, res, next) => {
    let token;
// Verify if token exists
    if(req.cookies.token)
        token = req.cookies.token;
    if(!token)
        return next(new ErrorResponse("You are not authorised.", 401))

// Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id)
    if(req.user) {
        next();
    }
    else
        return next(new ErrorResponse("You are not authorised.", 401));
})

exports.verifyOnlyUser = asyncHandler (async (req, res, next) => {
    let token;
// Verify if token exists
    if(req.cookies.token)
        token = req.cookies.token;
    if(!token)
        return next(new ErrorResponse("You are not authorised.", 401))
    
// Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id)
    if(req.user.isAdmin === true)
        return next( new ErrorResponse("Admins are not allowed to access this route.", 403));
    else if(req.user.isAdmin === false)
        next();
    else    
        return next(new ErrorResponse("You are not authorised.", 401))
})

exports.verifyAdmin = asyncHandler(async (req, res, next) => {
    let token;
// Verify if token exists
    if(req.cookies.token)
        token = req.cookies.token;
    if(!token)
        return next(new ErrorResponse("You are not authorised.", 401))

// Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id)
    if(req.user.isAdmin === true)
        next();
    else 
        return next(new ErrorResponse("You are not authorised to access this route.", 403));

});