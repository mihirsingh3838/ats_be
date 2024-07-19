const mongoose = require('mongoose');
const User = require('./userModel');

const attendanceSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Ensure an image is always provided
  },
  location: {
    lat: {
      type: Number,
      required: true, // Ensure latitude is always provided
    },
    lng: {
      type: Number,
      required: true, // Ensure longitude is always provided
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Use the model name as a string
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;