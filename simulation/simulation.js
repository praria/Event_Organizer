// simulates event generation and send events to the coordinator service

const axios = require('axios');

const events = [
    { event_type: 'feeling_ill', priority: 'Medium', description: 'guest has stomach ache after eating 5 pieces of cake' },
    { event_type: 'brawl', priority: 'High', description: 'two guests started fighting' },
    { event_type: 'dirty_table', priority: 'Low', description: 'a table is dirty' },
    { event_type: 'missing_bride', priority: 'High', description: 'the bride is missing' },
    // Add more events as needed for the simulation
];

const sendEvent = async (event) => {
    try {
        const response = await axios.post('http://localhost:3000/events', event);
        console.log(response.data);
    } catch (error) {
        console.error(`Error sending event: ${error}`);
    }
};

const simulateEvents = () => {
    events.forEach((event, index) => {
        setTimeout(() => sendEvent(event), index * 1000); // Adjust the timing as needed
    });
};

simulateEvents();
