const axios = require('axios');
const payloads = require('./testdata.js');
require('dotenv').config();

const PORT = process.env.PORT;

// Constants for timeframes in milliseconds
const TIMEFRAMES = {
    High: 5000,    // 5 seconds in the simulation
    Medium: 10000, // 10 seconds in the simulation
    Low: 15000     // 15 seconds in the simulation
};

let stressLevel = 0;
let currentEvent = null; // To keep track of the current event being worked on

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
        console.log(`Event handled: ${event.description}`);
        return true; // handled successfully
    } catch (error) {
        console.error(`Error sending event: ${error}`);
        return false; // handling failed
    }
};

// Function to simulate event handling
const simulateEvents = () => {
    payloads.forEach((events, payloadIndex) => {
        events.forEach((event, eventIndex) => {
            setTimeout(async () => {
                currentEvent = event;
                console.log(`Sending event: ${event.description}`);
                const eventHandled = await sendEvent(event);
                
                setTimeout(() => {
                    console.log(`Checking if event was handled: ${event.description}`);
                    if (!eventHandled) {
                        stressLevel++;
                        console.log(`Event not dealt within timeframe: ${event.description}. Stress level increased to ${stressLevel}.`);
                    } else {
                        console.log(`Event successfully handled within timeframe: ${event.description}.`);
                    }
                }, TIMEFRAMES[event.priority]);

                // Log idle state after handling the event
                setTimeout(() => {
                    console.log(`Worker is idle after event: ${event.description}`);
                }, TIMEFRAMES[event.priority]);
            }, (payloadIndex * 1000) + (eventIndex * 1000)); // timing for 1 second
        });
    });
};

// Simulate worker routines
const simulateWorkerRoutines = (routineType) => {
    const routine = routines[routineType];

    const work = () => {
        if (currentEvent) {
            console.log(`Worker is working on event: ${currentEvent.description}`);
        } else {
            console.log('Worker is working...');
        }
        setTimeout(idle, routine.work);
    };

    const idle = () => {
        if (currentEvent) {
            console.log(`Worker is idle after event: ${currentEvent.description}`);
            currentEvent = null; // Reset the current event after idling
        } else {
            console.log('Worker is idle...');
        }
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
simulateWorkerRoutines('Standard'); // change to 'Standard', 'Intermittent' or 'Concentrated' as needed

// stops after 6 minutes
stopSimulation(360000); // 6 minutes in milliseconds
