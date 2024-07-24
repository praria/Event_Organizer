// simulates event generation and send events to the coordinator service

const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3000;


const events = require('./testdata.js');

// constants for timeframes in milliseconds
const TIMEFRAMES = {
    High: 5000,    
    Medium: 10000, 
    Low: 15000     
};

let stressLevel = 0;

// Routine states
const routines = {
    Standard: { work: 20000, idle: 5000 },
    Intermittent: { work: 5000, idle: 5000 },
    Concentrated: { work: 60000, idle: 60000 }
};

// Function to send an event to the coordinator
const sendEvent = async (event) => {
    try {
        const response = await axios.post(`http://localhost:${PORT}/events`, event);
        console.log(response.data);
        return true; // handled successfully
    } catch (error) {
        console.error(`Error sending event: ${error}`);
        return false; // handling failed
    }
};

// Function to simulate event handling
const simulateEvents = () => {
    events.forEach((event, index) => {
        setTimeout(async () => {
            const eventHandled = await sendEvent(event);
            setTimeout(() => {
                if (!eventHandled) {
                    stressLevel++;
                    console.log(`Event not dealt within timeframe. Stress level increased to ${stressLevel}.`);
                }
            }, TIMEFRAMES[event.priority]);
        }, index * 1000); // Adjusted for 1 second
    });
};

// Simulate worker routines
const simulateWorkerRoutines = (routineType) => {
    const routine = routines[routineType];

    const work = () => {
        console.log('Worker is working...');
        setTimeout(idle, routine.work);
    };

    const idle = () => {
        console.log('Worker is idle...');
        setTimeout(work, routine.idle);
    };

    work();
};

// Stop simulation after a specified duration
const stopSimulation = (duration) => {
    setTimeout(() => {
        console.log('Simulation complete.');
        process.exit(0); 
    }, duration);
};

// Start the simulation
simulateEvents();
simulateWorkerRoutines('Standard'); // change to 'Intermittent' or 'Concentrated' as needed

// stops after 6 minutes
stopSimulation(600000);
