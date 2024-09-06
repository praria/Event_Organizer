const axios = require('axios');
const payloads = require('./testdata.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Priorities timeframes
const TIMEFRAMES = {
    High: 5000,    // 5 seconds in the simulation
    Medium: 10000, // 10 seconds in the simulation
    Low: 15000     // 15 seconds in the simulation
};

const TOTAL_GUESTS = 200;
const MAX_STRESS_LEVEL = 30;
const MAX_INDIVIDUAL_STRESS_LEVEL = 10;
let overallStressLevel = 0;
let currentEvent = null; // To keep track of the current event being worked on

// Initialize guests with Happy status
const guests = Array.from({ length: TOTAL_GUESTS }, () => ({ status: 'Happy', stressLevel: 0 }));

// Routines timeframes
const routines = {
    Standard: { work: 20000, idle: 5000 },
    Intermittent: { work: 5000, idle: 5000 },
    Concentrated: { work: 60000, idle: 60000 }
};

// Function to send an event to the coordinator
const sendEvent = async (event) => {
    // Simulate random failures
    const success = Math.random() > 0.2; // 80% success rate
    if (success) {
        try {
            const response = await axios.post(`http://localhost:${PORT}/events`, event);
            console.log(`Event handled: ${event.description}`);
            return true; // handled successfully
        } catch (error) {
            console.error(`Error sending event: ${error}`);
            return false; // handling failed
        }
    } else {
        console.log(`Event handling failed: ${event.description}`);
        return false; // handling failed
    }
};

// Function to update guest stress levels and statuses
const updateGuestStatuses = () => {
    if (overallStressLevel < MAX_STRESS_LEVEL) {
        const stressIncrement = 1; // Increment for each event not handled
        overallStressLevel += stressIncrement;

        // Distribute stress increment randomly among a subset of guests
        const affectedGuests = Math.min(5, TOTAL_GUESTS); // Affect a small percentage of guests
        for (let i = 0; i < affectedGuests; i++) {
            const randomIndex = Math.floor(Math.random() * TOTAL_GUESTS);
            const guest = guests[randomIndex];
            guest.stressLevel += stressIncrement;
            if (guest.stressLevel > MAX_INDIVIDUAL_STRESS_LEVEL) {
                guest.stressLevel = MAX_INDIVIDUAL_STRESS_LEVEL;
            }
            if (guest.stressLevel > 15) {
                guest.status = 'Stressed';
            } else if (guest.stressLevel > 10) {
                guest.status = 'Annoyed';
            } else if (guest.stressLevel > 5) {
                guest.status = 'Irritated';
            } else {
                guest.status = 'Happy';
            }
            console.log(`Guest ${randomIndex + 1} status: ${guest.status}, Stress Level: ${guest.stressLevel}`);
        }
        console.log(`Overall Stress Level: ${overallStressLevel}`);
    } else {
        console.log('Max stress level reached. No further stress increments.');
    }
};

// Function to simulate event handling by scheduling and sending events
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
                        console.log(`Event not dealt within timeframe: ${event.description}.`);
                        updateGuestStatuses();
                    } else {
                        console.log(`Event successfully handled within timeframe: ${event.description}.`);
                    }
                }, TIMEFRAMES[event.priority]);

                // Log idle state after handling the event
                setTimeout(() => {
                    console.log(`Worker is idle after event: ${event.description}`);
                }, TIMEFRAMES[event.priority]);
            }, (payloadIndex * 1000) + (eventIndex * 1000)); // timing each with 1 second interval
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
