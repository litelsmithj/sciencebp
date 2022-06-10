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

// To fix double creation of the same tracker
trackerSchema.index({protocol: 1, user: 1}, {unique: true})

module.exports = mongoose.model('Tracker', trackerSchema);