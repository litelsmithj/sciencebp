const express = require('express');
const router = express.Router();
const {getTrackers, setTracker} = require('../controllers/trackerController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getTrackers).post(protect, setTracker);

module.exports = router;