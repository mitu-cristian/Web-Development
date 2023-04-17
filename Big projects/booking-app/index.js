const express = require('express');
const dotenv = require("dotenv").config();
const connectDB = require("./api/config/db");
const errorHandler = require("./api/middleware/error")
const cookieParser = require('cookie-parser');

const authRoute = require("./api/routes/auth");
const usersRoute = require("./api/routes/users");
const hotelsRoute = require("./api/routes/hotels");
const roomsRoute = require("./api/routes/rooms");

const app = express(); 

// Middlewares
// Body parser
app.use(express.json());
app.use(cookieParser());

// Mount the routers
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error middleware
app.use(errorHandler)

const server = app.listen(8800, ()=> {
    connectDB();
    console.log("Connected to backend :)")
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server and exit process
    server.close(() => {
    process.exit(1);
    }) 
})