const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`Mongo connected: ${conn.connection.host}`);
}

module.exports = connectDB;