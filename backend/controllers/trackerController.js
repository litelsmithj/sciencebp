const asyncHandler = require('express-async-handler');
const Tracker = require('../models/trackerModel');
const User = require('../models/userModel');

// @desc Get trackers
// @route GET /api/trackers
// @access private
// Currently not used
const getTrackers = asyncHandler(async(req, res) => {
    const trackers = await Tracker.find();
    res.status(200).json(trackers);
});

// @desc Get trackers by id
// @route GET /api/trackers/:id
// @access private
// Currently not used
const getTrackerById = asyncHandler(async(req,res) => {
    const tracker = await Tracker.findById(req.params.id);

    if (!tracker) {
        res.status(400);
        throw new Error('Tracker not found');
    }

    res.status(200).json(tracker);
});

// @desc Set tracker
// @route POST /api/trackers
// @access private
const setTracker = asyncHandler(async(req,res) => {
    if(!req.body) {
        res.status(400);
        throw new Error('Tracker not created');
    }

    const tracker = await Tracker.create({
        user: req.user.id,
        protocol: req.body.protocol,
        count: 0
    });

    res.status(200).json(tracker);
});

// @desc Update the day to 0 or 1
// @route PUT /api/trackers/:id
// @access private
const updateTracker = asyncHandler(async(req, res) => {
    const tracker = await Tracker.findById(req.params.id);
    
    if (!tracker) {
        res.status(400);
        throw new Error("Tracker not found");
    }
    
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (tracker.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    tracker.days.set(req.body.key, req.body.value);
    tracker.count = req.body.count;

    const updatedTracker = await Tracker.findByIdAndUpdate(req.params.id, tracker, {
        new: true
    });

    res.status(200).json(updatedTracker);
});

module.exports = {
    getTrackers,
    getTrackerById,
    setTracker,
    updateTracker,
};