const Attendance = require('../models/attendanceModel');
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const markAttendance = async (req, res) => {
  const { location } = req.body;
  const { file } = req; // Multer will populate this with the uploaded file

  if (!file) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const imagePath = path.join(__dirname, "../uploads", `${uuidv4()}-${file.originalname}`);

  // Move the file from the temporary path to the desired location
  fs.renameSync(file.path, imagePath);

  const attendance = new Attendance({
    image: imagePath, // Save path to the image in the database
    location: JSON.parse(location),
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

module.exports = { markAttendance };
