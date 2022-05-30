const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    protocol: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Protocol'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);