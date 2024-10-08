const mongoose = require ("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology:true
        });
        console.log(`Mongoose connectedL: ${conn.connection.host}`.cyan.underline);
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }

}

module.exports = connectDB;