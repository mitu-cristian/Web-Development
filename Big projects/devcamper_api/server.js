const express = require('express');
const dotenv = require('dotenv');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load the config file
dotenv.config({path: './config/config.env'});

// Connect to the databse
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

// Router
app.use('/api/v1/bootcamps', bootcamps);


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