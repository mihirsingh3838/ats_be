require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const attendanceRoutes = require('./routes/attendance')
const userRoutes = require('./routes/user')
const bodyParser = require("body-parser");

// express app
const app = express()

// middleware
app.use(express.json())

app.use(bodyParser.json({ limit: "10mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/attendance', attendanceRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })