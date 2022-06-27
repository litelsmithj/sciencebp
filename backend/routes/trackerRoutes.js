const express = require('express');
const router = express.Router();
const {getTrackers, getTrackerById, setTracker, updateTracker, trackerExists, trackerWeekExists, addTrackerWeek} = require('../controllers/trackerController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getTrackers).post(protect, setTracker);

router.route('/addWeek').put(protect, addTrackerWeek);

router.route('/:id').get(protect, getTrackerById).put(protect, updateTracker); 

router.route('/exists').post(protect, trackerExists);

router.route('/weekExists').post(protect, trackerWeekExists);

module.exports = router;