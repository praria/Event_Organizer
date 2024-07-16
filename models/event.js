// database schema and model for events

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_type: String,
    priority: String,
    description: String,
    status: {type: String, default: 'Pending'}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;