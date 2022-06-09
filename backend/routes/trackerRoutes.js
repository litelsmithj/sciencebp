const express = require('express');
const router = express.Router();
const {getTrackers, getTrackerById, setTracker} = require('../controllers/trackerController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getTrackers).post(protect, setTracker);

router.route('/:id').get(protect, getTrackerById);

module.exports = router;