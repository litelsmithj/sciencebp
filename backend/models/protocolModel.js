const mongoose = require('mongoose');

const protocolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Protocol', protocolSchema);