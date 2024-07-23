const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { markAttendance, getAttendanceByDate, getAllAttendance } = require('../controllers/attendaceController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(requireAuth);

router.post('/', upload.single('image'), markAttendance);
router.get('/', getAttendanceByDate);
router.get('/all', getAllAttendance);

module.exports = router;
