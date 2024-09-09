// database schema and model for workers

const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Idle', 'Busy'],
        default: 'Idle'
    }
});

module.exports = mongoose.model('Worker', workerSchema);
