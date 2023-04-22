const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please add your first name."],
    },
    lastname: {
        type: String, 
        required: [true, "Please add your last name."],
    },
    email: {
        type: String,
        required: [true, "Please add an email address."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password."],
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
)

// Encrypting password using bcrypt
UsersSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        next();
    const salt = await bcrypt.genSalt(10);
// We have access to the password from the body
    this.password = await bcrypt.hash(this.password, salt);
} )

// Sign JWT and return
UsersSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Match user entered password to hashed password in the database
UsersSchema.methods.matchPassword = async function (enteredPassword) {
// this.password is the hashed password saved in the database
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("Users", UsersSchema);