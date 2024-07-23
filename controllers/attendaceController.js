const Attendance = require('../models/attendanceModel');
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const markAttendance = async (req, res) => {
  const { location } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const imagePath = path.join(__dirname, "../uploads", `${uuidv4()}-${file.originalname}`);

  fs.renameSync(file.path, imagePath);

  const timestamp = new Date(); 

  const attendance = new Attendance({
    image: imagePath,
    location: JSON.parse(location),
    date: new Date().toISOString().split('T')[0], // Save only the date part
    timestamp,
    user: req.user._id,
  });

  try {
    await attendance.save();
    res.status(201).json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAttendanceByDate = async (req, res) => {
  const { date } = req.query;
  const userId = req.user._id;

  const startDate = new Date(date);
  startDate.setUTCHours(0, 0, 0, 0); // Start of the day in UTC

  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 1); // End of the day in UTC

  try {
    const attendances = await Attendance.find({
      user: userId,
      timestamp: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllAttendance = async (req, res) => {
  const userId = req.user._id;

  try {
    const attendances = await Attendance.find({ user: userId }).sort({ timestamp: 1 });

    res.status(200).json(attendances);
  } catch (error) {
    console.error("Error fetching all attendance:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { markAttendance, getAttendanceByDate, getAllAttendance };
