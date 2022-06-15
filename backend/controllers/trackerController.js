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
    
    var tracker = await Tracker.find({protocol: req.body.protocol, user: req.user.id}); 
    
    // Maybe add if exists function instead of including in the POST req
    if (tracker.length > 0) {
        var trackerDays = tracker[0].days;
        var trackerDay = trackerDays.find((day)=> day.date === req.body.dateString);

        if (!trackerDay){
            trackerDays.push({'date': req.body.dateString, values: {'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false}})

            const updatedTracker = await Tracker.findOneAndUpdate({protocol: req.body.protocol, user: req.user.id}, {days: trackerDays}, {
                new: true
            });

            res.status(200).json(updatedTracker);
        }
        
    } else {
        const newTracker = await Tracker.create({
            user: req.user.id,
            protocol: req.body.protocol,
            count: 0,
            days: [{'date': req.body.dateString, values: {'Mon': false, 'Tue': false, 'Wed': false, 'Thu': false, 'Fri': false, 'Sat': false, 'Sun': false}}]
        });
        res.status(200).json(newTracker);
    }
});

// @desc Update the tracker and counter for the given day
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

    var trackerValues = tracker.days.find((day)=> day.date === req.body.date).values;
    
    Object.keys(trackerValues).forEach(dow => {
        if (dow === req.body.key){
            trackerValues[dow] = req.body.value;
        }
    });
    
    tracker.days.find((day)=> day.date === req.body.date).values = trackerValues;
    
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