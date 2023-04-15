const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
);

// Encripting password using bcrypt
UserSchema.pre('save', async function(next)  {
    if(!this.isModified('password'))
        next();
    const salt = await bcrypt.genSalt(10);
// We have access to the password from the body
    this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRE
        })
}

// Match user entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
// this.password is the hashed password saved in the database
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);