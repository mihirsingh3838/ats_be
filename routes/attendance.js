const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { markAttendance } = require('../controllers/attendaceController')
const multer = require('multer');

const router = express.Router()

const upload = multer({ dest: 'uploads/' });

// require auth for all workout routes
router.use(requireAuth)

// POST a new workout
router.post('/', upload.single('image') ,markAttendance)

module.exports = router