const express = require ("express");
const dotenv = require ("dotenv").config();
const colors = require("colors");
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
// const bodyParser = require ("express").json;
const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

// Middleware
app.use(express.json() );

// Routes
app.use("/user", require("./routes/userRoutes"));

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle unhandler promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server and exit process
    server.close(() => {
        process.exit(1);
    })
})