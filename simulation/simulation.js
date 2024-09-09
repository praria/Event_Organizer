const axios = require('axios');
const payloads = require('./testdata.js');
require('dotenv').config();

const PORT = process.env.PORT;

// Priorities timeframes
const TIMEFRAMES = {
    High: 5000,    // 5 seconds in the simulation
    Medium: 10000, // 10 seconds in the simulation
    Low: 15000     // 15 seconds in the simulation
};

let overallStressLevel = 0;

// Team routines
const routines = {
    Standard: { work: 20000, idle: 5000 },    // Security, Waiters
    Intermittent: { work: 5000, idle: 5000 }, // Clean_up
    Concentrated: { work: 60000, idle: 60000 } // Catering, Officiant
};

const teamRoutines = {
    Security: 'Standard',
    Clean_up: 'Intermittent',
    Catering: 'Concentrated',
    Officiant: 'Concentrated',
    Waiters: 'Standard'
};

let workerAvailability = {
    Security: true,
    Clean_up: true,
    Catering: true,
    Officiant: true,
    Waiters: true
};

// Function to update worker availability based on their routine
const updateWorkerAvailability = (team, routineType) => {
    const routine = routines[routineType];
    workerAvailability[team] = false;

    // After the work period, the worker becomes idle
    setTimeout(() => {
        workerAvailability[team] = true;
        console.log(`${team} is now idle and available for new events.`);
    }, routine.work);
};

// Function to handle event with workers
const handleEvent = async (event) => {
    console.log(`Event object:`, event); // Debug log to check event structure
    
    const team = event.team; // Assign event to team
    const routineType = teamRoutines[team];

    if (workerAvailability[team]) {
        console.log(`Worker from ${team} team is handling event: ${event.description}`);

        // Worker is busy during their work period
        updateWorkerAvailability(team, routineType);

        try {
            const response = await axios.post(`http://localhost:${PORT}/events`, event);
            console.log(`Event handled: ${event.description}`);
            return true;
        } catch (error) {
            console.error(`Error sending event: ${error}`);
            return false;
        }
    } else {
        console.log(`Worker from ${team} team is unavailable for event: ${event.description}`);
        return false; // Event could not be handled
    }
};

// Function to update overall stress level when events are not handled
const updateOverallStressLevel = () => {
    const stressIncrement = 1;
    overallStressLevel += stressIncrement;
    console.log(`Overall Stress Level: ${overallStressLevel}`);
};

// Simulate event handling by scheduling and sending events
const simulateEvents = () => {
    payloads.forEach((events, payloadIndex) => {
        events.forEach((event, eventIndex) => {
            setTimeout(async () => {
                console.log(`Sending event: ${event.description}`);

                const eventHandled = await handleEvent(event);

                // If the event is not handled within its priority timeframe, increment stress
                setTimeout(() => {
                    console.log(`Checking if event was handled: ${event.description}`);
                    if (!eventHandled) {
                        console.log(`Event not handled within timeframe: ${event.description}.`);
                        updateOverallStressLevel();
                    }
                }, TIMEFRAMES[event.priority]);

            }, (payloadIndex * 1000) + (eventIndex * 1000)); // timing each with 1 second interval
        });
    });
};

// Simulate worker routines based on their team's routine type
const simulateWorkerRoutines = (team, routineType) => {
    const routine = routines[routineType];

    const work = () => {
        if (workerAvailability[team]) {
            console.log(`${team} team is working...`);
        }
        setTimeout(idle, routine.work);
    };

    const idle = () => {
        console.log(`${team} team is idle and available for events.`);
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

// Simulate routines for each team
Object.keys(teamRoutines).forEach(team => {
    simulateWorkerRoutines(team, teamRoutines[team]);
});

// Stops simulation after 6 minutes
stopSimulation(360000); // 6 minutes in milliseconds
