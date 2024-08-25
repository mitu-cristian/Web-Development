const asyncHandler = require('express-async-handler'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const UserVerification = require("../models/userVerificationModel");
const nodemailer = require("nodemailer");
const {v4: uuidv4} = require("uuid");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

// Testing the transporter
transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log("Ready for sending email messages");
        console.log(success);
    }
});

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    // Validation
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields.")
    }

    const checkUser = await User.findOne({email});


    // checkUser: YES
    if(checkUser) {
        // User is successfully registered
        if(checkUser.verified == true) {
            res.status(400);
            throw new Error("This account already exists. Please log in.");
        }

        const checkUserVerification = await UserVerification.findOne({user: checkUser._id});
        
        if(checkUser.verified == false) {
    
            // checkUser: YES   checkUserVerification: NO
            if(!checkUserVerification) {
                await User.findOneAndDelete({_id: checkUser._id});
                res.status(401);
                throw new Error("Please register again.")
            }
    
            // If the link is active (has less than 6 hours)
            if(checkUserVerification.expiredAt > Date.now()) {
                res.status(401);
                throw new Error(`Check the ${checkUser.email} inbox. Look for an email received from ${process.env.AUTH_EMAIL}.`);
            }
    
            // If the link is inactive (has more than 6 hours)
            if(checkUserVerification.expiredAt < Date.now()) {
                // delete the user verification data
                await UserVerification.findOneAndDelete({_id: checkUserVerification._id});
                
                // send again the verification email
                sendVerificationEmail(checkUser, res);
            }
    
        }

    }

    // checkUser: NO
    else if(!checkUser){
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create user
        const user = await User.create({
            name: name, 
            email: email, 
            password: hashedPassword
        });
        sendVerificationEmail(user, res);       
    }

});

const sendVerificationEmailOld = asyncHandler (async ({_id, email}, res) => {
    // url to be used in the email
    const currentUrl = "http://localhost:8000";
    const uniqueString = uuidv4() + _id;
    // mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email to complete the registration.</p>
        <p>This link expires in 6 hours.</p>
        <p>Press <a href='${currentUrl + "/api/users/verify/" + _id + "/" + uniqueString}'>here</a> to activate your account.</p>
        `
    };

    // hash the uniqueString
    const salt = await bcrypt.genSalt(10);
    const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
    const newUserVerification = await UserVerification.create({
        user: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiredAt: Date.now() + 21600000
    });

    if(newUserVerification) {
        const sentMail = await transporter.sendMail(mailOptions);
        if(sentMail) {
            res.status(200);
            res.json({
                message: `Check ${email} to activate your account.`
            });
        }
    }
});

const sendVerificationEmail = asyncHandler (async ({_id, email}, res) => {
    // url to be used in the email
    const currentUrl = "http://localhost:3000";
    const uniqueString = uuidv4() + _id;
    // mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email to complete the registration.</p>
        <p>This link expires in 6 hours.</p>
        <p>Press <a href='${currentUrl + "/verify/" + _id + "/" + uniqueString}'>here</a> to activate your account.</p>
        `
    };

    // hash the uniqueString
    const salt = await bcrypt.genSalt(10);
    const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
    const newUserVerification = await UserVerification.create({
        user: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiredAt: Date.now() + 21600000
    });

    if(newUserVerification) {
        const sentMail = await transporter.sendMail(mailOptions);
        if(sentMail) {
            res.status(200);
            res.json({
                message: `Check ${email} to activate your account.`
            });
        }
    }
});

const verifyEmailLink = asyncHandler( async (req, res) => {
    let {userId, uniqueString} = req.params;
    const checkUserVerification = await UserVerification.findOne({user: userId});

    // checkUserVerification: NO
    if(!checkUserVerification) {
        const message = "This verification link doesn't exist.";
        // res.redirect(`/user/verified?error=true&messsage=${message}`)
        res.status(401);
        throw new Error("This verification link doesn't exist.")
    }

    // checkUserVerification: YES
    else {
        const checkUser = await User.findById(userId);
        
        // checkUser: NO    checkUserVerification: YES
        if(!checkUser) {
            await checkUserVerification.deleteOne();
            res.status(401);
            throw new Error("An error occurred. Please register again.");
        }
        if(checkUser.verified == true) {
            res.status(401);
            throw new Error("This account was already verified. Please log in.");
        }
        if(checkUserVerification.expiredAt < Date.now()) {
            await checkUserVerification.deleteOne();
            await User.deleteOne({_id: userId});
            res.status(401);
            throw new Error("Verification link is expired. Please register again.");
        }
        if(await bcrypt.compare(uniqueString, checkUserVerification.uniqueString)) {
            // right branch
            await User.updateOne({_id: userId}, {verified: true});
            await checkUserVerification.deleteOne();
            res.status(200).json({
                message: "This account is successfully verified. Please log in."
            });
        }
    }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler ( async (req, res) => {
    const {email, password} = req.body;
    const checkUser = await User.findOne({email});

    if(!checkUser) {
        res.status(401);
        throw new Error("This account doesn't exist. Please register.")
    }
    if(checkUser.verified == false) {
        res.status(401);
        throw new Error(`Account not verified. Please check the ${email} for an email sent by ${process.env.AUTH_EMAIL}`);
    }
// Check user and password match
    const checkPasswordsMatch = await bcrypt.compare(password, checkUser.password);
    if(checkPasswordsMatch == false) {
        res.status(401);
        throw new Error("Invalid credentials.");
    }
    if(checkPasswordsMatch == true) {
            res.status(200).json({
            _id: checkUser._id,
            name: checkUser.name,
            email: checkUser.email,
            token: generateToken(checkUser._id)
        });
    }
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    } )
}

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler ( async(req, res) => {
// we have req.user from the authMiddleware
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})

module.exports = {
    registerUser, loginUser, getMe, verifyEmailLink
}