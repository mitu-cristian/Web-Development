const mongoose = require("mongoose")

const HotelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name for your hotel."],
        trim: true,
        maxlength: [50, "Name can not be longer than 50 characters."]
    },
    city: {
        type: String,
        required: [true, "Please add the city where the hotel is located."]
    },
    address: {
        type: String,
        required: [true, "Please add the address where the hotel is located"]
    },
    description: {
        type: String,
        required: [true, "Please add a description."],
        maxlength: [500, "Description can not be longer than 500 characters"]
    },
    phone: {
        type: String,
        maxlength: [20, "Phone can not be longer than 20 characters."]
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address.']
    },
    averageRating: {
        type: Number
    }
},
{timestamps: true})

module.exports = mongoose.model("Hotels", HotelsSchema); 