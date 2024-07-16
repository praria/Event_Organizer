// database schema and model for workers

const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    team: String,
    status: { type: String, default: 'Idle' }
});

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;
