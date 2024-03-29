const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
connectDB()

const app = express()

// Middleware for handling the body of an endpoint
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})