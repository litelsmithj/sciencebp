const asyncHandler = require('express-async-handler');
const Tracker = require('../models/trackerModel');

// @desc Get trackers
// @route GET /api/trackers
// @access private
const getTrackers = asyncHandler(async(req,res) => {
    const trackers = await Tracker.find();
    res.status(200).json(trackers);
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

module.exports = {
    getTrackers,
    setTracker
};