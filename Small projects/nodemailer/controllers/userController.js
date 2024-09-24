const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require ("../models/userModel");
const UserVerification = require("../models/userVerificationModel");
const PasswordResetRequest = require("../models/passwordResetRequest");
const PasswordResetHistory = require("../models/passwordResetHistory");
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

// testing the transporter
transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log("Ready for message");
        console.log(success);
    }
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

// @desc    Register new user
// @route   /user/register
// @access  public
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

const sendVerificationEmail = asyncHandler (async ({_id, email}, res) => {
    // url to be used in the email
    const currentUrl = "http://localhost:8000/user/";
    const uniqueString = uuidv4() + _id;
    // mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email to complete the registration.</p>
        <p>This link expires in 6 hours.</p>
        <p>Press <a href='${currentUrl + "/verify-register-link/" + _id + "/" + uniqueString}'>here</a> to activate your account.</p>
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

// @desc    Verify the link sent in the email
// @route   /user/verify-register-link/:userId/:uniqueString
// @access  Public
const verifyRegisterEmailLink = asyncHandler( async (req, res) => {
    const {userId, uniqueString} = req.params;
    const checkUserVerification = await UserVerification.findOne({user: userId});
    const checkUser = await User.findById(userId);

    if(!checkUser) {
        if(checkUserVerification)
            await checkUserVerification.deleteOne();
        res.status(500);
        throw new Error("An error occurred. Please register again.")
    }

    if(checkUser.verified == true) {
        res.status(401);
        throw new Error("This account was already verified. Please log in.");
    }

    // checkUserVerification: NO
    if(!checkUserVerification) {
        if(checkUser)
            await checkUser.deleteOne();
        res.status(500);
        throw new Error("An error occurred. Please register again.")
    }

    // checkUser: NO
    if(!checkUser) {
        await checkUserVerification.deleteOne();
        res.status(500);
        throw new Error("An error occurred. Please register again.");
    }

    // checkUserVerification: YES
    if(checkUserVerification) {
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
);

// @desc    login user
// @route   /user/login
// @access  public
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
});

// @desc    Send Reset password email
// @route   /user/change-password-email
// @access  Public
const sendChangePasswordEmail = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const checkUser = await User.findOne({email: email});
    if(!checkUser) {
        res.status(401);
        throw new Error(`There is no account with the ${email} address.`);
    }
    else if(checkUser) {
        // url to be used in the email
        const currentUrl = "http://localhost:8000/user/verify-change-password-link/";
        const uniqueString = uuidv4() + checkUser._id;
        // mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Change your password",
            html: `<p>Access the link below to change your password. If you didn't request a password change for your account, please discard this email.</p>
                    <p>This link expires in 6 hours.</p>
                    <p>Press <a href='${currentUrl + checkUser._id + "/" + uniqueString}'>here </a> to change your password. </p>`
                    
        };
    
        // hash the uniqueString
        const salt = await bcrypt.genSalt(10);
        const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
        
        await transporter.sendMail(mailOptions);
        
        const createPasswordResetRequest = await PasswordResetRequest.create({
            user: checkUser._id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiredAt: Date.now() + 21600000
        });
        
        await PasswordResetHistory.create({ 
            user: checkUser.id,
            passwordResetRequest: createPasswordResetRequest._id,
            createdAt: Date.now(),
            status: "pending"});
        res.status(200);
        res.json({
            message: `Check ${email} to change your password.` 
        })
    }
        
});

// @desc    Verify reset password email link
// @route   /user/verify-change-password-link/:userId/:uniqueString
// @access  Public
const verifyChangePasswordEmailLink = asyncHandler (async (req, res) => {
    const {userId, uniqueString} = req.params;
    const {newPassword} = req.body;
    const checkUser = await User.findById(userId);
    
    if(!checkUser) {
        const checkPasswordResetRequest = await PasswordResetRequest.findOne({user: userId});
        
        // checkUser: NO    checkPasswordResetRequest: YES
        // => delete checkPasswordResetRequest
        if(checkPasswordResetRequest) {
            
            const checkPasswordResetHistory = await PasswordResetHistory.find({passwordResetRequest: checkPasswordResetRequest._id});
            
            // checkUser: NO    checkPasswordResetRequest: YES    checkPasswordResetHistory: YES
            // => delete both of them
            if(checkPasswordResetHistory) {
                await checkPasswordResetRequest.deleteOne();
                await checkPasswordResetHistory.deleteOne();
            }
            
            // checkUser: NO    checkPasswordResetRequest: YES    checkPasswordResetHistory: NO
            // => delete checkPasswordResetRequest
            else if(!checkPasswordResetHistory) {

                // delete checkPasswordResetRequest
                await checkPasswordResetRequest.deleteOne();
            }
        }

        // checkUser: NO    checkPasswordResetRequest: NO
        else if(!checkPasswordResetRequest) {
            res.status(500);
            throw new Error("The account for which you requested a password change doesn't exist.");            
        }
    }

    // checkUser: YES
    else if(checkUser) {
        const checkPasswordResetRequest = await PasswordResetRequest.findOne({user: userId});

        // checkUser: YES   checkPasswordResetRequest: YES
        if(checkPasswordResetRequest){
            const checkPasswordResetHistory = await PasswordResetHistory.findOne({passwordResetRequest: checkPasswordResetRequest._id});

            // CheckUser: YES   checkPasswordResetRequest: YES     checkPasswordResetHistory: YES
            // right branch
            if(checkPasswordResetHistory) {
                
                // reset request is expired
                if(checkPasswordResetRequest.expiredAt < Date.now()) {
                    await checkPasswordResetRequest.deleteOne();
                    checkPasswordResetHistory.status = "failed";
                    await checkPasswordResetHistory.save();
                }

                // user can reset the password
                if(checkPasswordResetRequest.expiredAt > Date.now()) {
                    if (await bcrypt.compare(uniqueString, checkPasswordResetRequest.uniqueString)) {
                        const salt = await bcrypt.genSalt(10);
                        // const hashedNewPassword = await bcrypt.hash(newPassword, salt);
                        await User.updateOne({_id: userId}, {password: "changed password"});
                        await checkPasswordResetRequest.deleteOne();
                        checkPasswordResetHistory.status = "completed";
                        await checkPasswordResetHistory.save();
                        res.status(200).json({
                            message: "The password has successfuly changed."
                        });
                    }
                    else {
                        res.status(401);
                        throw new Error("This link doesn't belong to your account.");
                    }
                }

            }

            // checkUser: YES   checkPasswordResetRequest: YES     checkPasswordResetHistory: NO
            // delete checkPasswordResetRequest
            else if(!checkPasswordResetHistory) {
                await checkPasswordResetRequest.deleteOne();
                res.status(500);
                throw new Error("An error occurred. Please request again a password change.");
            }
        }

        // checkUser: YES   checkPasswordResetRequest: NO
        if(!checkPasswordResetRequest) {
            const checkPasswordResetHistory = await PasswordResetHistory.find({user: checkUser._id}).sort({createdAt: -1}).limit(1);
            console.log(checkPasswordResetHistory[0]);
            
            // checkUser: YES   checkPasswordResetRequest: NO   checkPasswordResetHistory: YES
            if(checkPasswordResetHistory[0]) {
                if(checkPasswordResetHistory[0].status == "completed") {
                    res.status(400).json({
                        message: "You have already changed your password."
                    });
                }

                if(checkPasswordResetHistory[0].status == "pending") {
                    checkPasswordResetHistory[0].status = "failed";
                    await checkPasswordResetHistory[0].save();
                    throw new Error("An error occured. Please request again a password change.")    
                }

                if(checkPasswordResetHistory[0].status == "failed") {
                    res.status(400).json({
                        message: "This link is no longer available for changinf your password."
                    });
                }
            }

            // checkUser: YES   checkPasswordResetRequest: NO   checkPasswordResetHistory: NO
            if(!checkPasswordResetHistory[0]) {
                res.status(400);
                throw new Error("This is not a valid request for changing the password.");
            }

        }

    }





});


module.exports = {registerUser, loginUser, verifyRegisterEmailLink, sendChangePasswordEmail, verifyChangePasswordEmailLink};