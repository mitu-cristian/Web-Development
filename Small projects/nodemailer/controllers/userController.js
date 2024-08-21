const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require ("../models/userModel");
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
// @route   /register
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    // Validation
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields.")
    }

    // Find if the user already exists
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name: name, 
        email: email, 
        password: hashedPassword
    }).then((result) => {
        // handle account verification
        sendVerificationEmail(result, res);
    }).catch((error) => console.log(error))

    // if(user) {
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         verified: user.verified,
    //         token: generateToken(user._id)
    //     })
    // }
});

const sendVerificationEmail = ({_id, email}, res) => {
    // url to be used in the email
    const currentUrl = "http://localhost:8000";
    const uniqueString = uuidv4() + _id;
    // mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email to complete the regidtration.</p>
                <p>This links expires in 6 hours.</p>
                <p>Press <a href="${currentUrl + "/user/verify/" + _id + "/" + uniqueString}>here</a> to activate your account.</p>`
    };

    // hash the uniqueString
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set value in userVerification table
            const newUserVerification = new UserVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000
            });
            newUserVerification
                .save()
                .then(() => {
                    transporter.sendMail(mailOptions)
                        .then(() => {
                            // email sent and verification record saved
                            res.json({
                                message: "Email sent and verification record saved"
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({
                                message: "Failed to send the verification email."
                            })
                        })
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        message: `Couldn't save verification email data.`
                    })
                })
        })
        .catch(() => {
            console.log(error);
            res.json({
                message: "Error while producing the uniqueString."
            });
    })
}

const verifyEmailLink = asyncHandler( async (req, res) => {
    let {userId, uniqueString} = req.params;
    console.log("The user id is: " + userId);
    console.log("The unique string is: " + uniqueString);
    const checkUserVerification = await UserVerification.findOne({userId});
    if(!checkUserVerification) {
        const message = "This verification link doesn't exist.";
        // res.redirect(`/user/verified?error=true&messsage=${message}`)
        res.status(401);
        throw new Error("This verification link doesn't exist.")
    }
    else {
        const checkUser = await User.findById(userId);
        
        
        console.log(checkUser);
        

        if(!checkUser) {
            console.log("1");
            res.status(401);
            throw new Error("This user doesn't exist.")
        }
        if(checkUserVerification.expiredAt < Date.now()) {
            console.log("2");
            await UserVerification.deleteOne({userId});
            await User.deleteOne({_id: userId});
            res.status(401);
            throw new Error("Verification link is expired. Please register again.");
        }
        if(checkUser.verified == true) {
            console.log("3");
            
            console.log(checkUser.verified);
            
            
            res.status(401);
            throw new Error("This account was already verified.");
        }
        if(checkUser.verified == false && (await bcrypt.compare(uniqueString, checkUserVerification.uniqueString))) {
            console.log("4");
            // right branch
            await User.updateOne({_id: userId}, {verified: true});
            await UserVerification.deleteOne({userId});
            res.status(200).json({
                message: "The account was successfully verified"
            });
        }
    }
})

// @desc    login user
// @route   /login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user.verified == false) {
        res.status(401);
        throw new Error("User not verified. Check the email address.");
    }
    if(user && user.verified == true && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } 
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
})

module.exports = {registerUser, loginUser, verifyEmailLink};