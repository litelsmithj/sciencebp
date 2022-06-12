const express = require('express');
const router = express.Router();
const {getTrackers, getTrackerById, setTracker, addOne} = require('../controllers/trackerController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getTrackers).post(protect, setTracker);

router.route('/:id').get(protect, getTrackerById).put(protect, addOne);

module.exports = router;