const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cookieParser = require("cookie-parser");

// Load the config file
dotenv.config({path: "./config/config.env"});

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cookie Parser
app.use(cookieParser())

// Routes
app.use("/api/rooms", require("./routes/roomsRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/reviews", require("./routes/reviewsRoutes"));
app.use("/api/hotels", require("./routes/hotelsRoutes"));

// Dev logging middleware
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// Error Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // Close server and exit process
    server.close(() => {
        process.exit(1);
    })
})