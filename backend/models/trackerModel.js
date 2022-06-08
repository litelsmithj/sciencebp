const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema({
    protocol: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Protocol'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    count: {
        type: Number,
        required: true
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Tracker', trackerSchema);