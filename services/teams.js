// consumes events from kafka, checks worker availability and assigns events to them
// logs event handling or increments stress levels if no workers are available

const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
require('dotenv').config();

const Event = require('../models/event');
const Worker = require('../models/worker');

// Check environment variables
const result = require('dotenv').config();
if (result.error) {
    throw result.error;
}
console.log('Parsed .env:', result.parsed); 
console.log('MONGO_URI:', process.env.MONGO_URI);

// MongoDB connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

// Kafka setup
const kafka = new Kafka({
    clientId: 'teams',
    brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'team-group' });

// Team mapping based on event types
const teamMapping = {
    Security: ['brawl', 'not_on_list', 'person_fell', 'injured_kid', 'accident'],
    Clean_up: ['dirty_table', 'dirty_floor', 'broken_glass', 'broken_itens'],
    Catering: ['bad_food', 'music_too_loud', 'music_too_low', 'feeling_ill', 'music'],
    Officiant: ['missing_rings', 'missing_bride', 'missing_groom', 'bride', 'groom'],
    Waiters: ['accident', 'broken_glass', 'person_fell', 'injured_kid', 'feeling_ill']
};

// Predefined number of workers per team
const predefinedWorkers = {
    Security: 7, 
    Clean_up: 15,
    Catering: 25,
    Officiant: 8,
    Waiters: 20
};

// Function to create workers based on predefined numbers
const createWorkers = async () => {
    for (const [team, count] of Object.entries(predefinedWorkers)) {
        for (let i = 0; i < count; i++) {
            let worker = new Worker({
                name: `Worker ${i + 1} (${team})`,
                team,
                status: 'Idle'
            });
            await worker.save();
            console.log(`Created ${worker.name} in team ${team}`);
        }
    }
};

// Function to assign an event to a team based on its event type
const assignTeam = (eventType) => {
    for (const [team, eventTypes] of Object.entries(teamMapping)) {
        if (eventTypes.includes(eventType)) {
            return team;
        }
    }
    return null; // If no team matches the event type
};

// Function to handle the event
const handleEvent = async (event) => {
    // Assign the event to the appropriate team
    const team = assignTeam(event.event_type);
    
    if (team) {
        console.log(`Assigning event to team: ${team}`);
        
        // Find an available worker from the team (worker must be idle)
        let worker = await Worker.findOne({ team, status: 'Idle' });
        if (worker) {
            console.log(`Worker ${worker._id} from team ${team} assigned to event ${event.description}`);

            // Mark worker as busy and update event status
            worker.status = 'Busy';
            await worker.save();

            // Simulate processing time for handling the event
            setTimeout(async () => {
                console.log(`Event ${event.description} handled by team ${team}`);
                
                // Update event status to 'Handled'
                event.status = 'Handled';
                await event.save();
                
                // Set worker back to idle
                worker.status = 'Idle';
                await worker.save();
            }, 3000); // Simulated processing time
        } else {
            console.log(`No available workers in team ${team} to handle event ${event.description}`);
            event.status = 'Pending'; // Mark event as pending if no workers are available
            await event.save();
        }
    } else {
        console.log(`No team found for event type: ${event.event_type}`);
    }
};

// Start the Kafka consumer and handle events
const start = async () => {
    await connectMongoDB();
    
    // Check if workers already exist in the database, otherwise create them
    const existingWorkers = await Worker.countDocuments();
    if (existingWorkers === 0) {
        console.log('No workers found, creating workers...');
        await createWorkers();
    } else {
        console.log('Workers already exist, skipping creation...');
    }

    await consumer.connect();
    console.log('Kafka Consumer connected');

    await consumer.subscribe({ topic: 'events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log(`Received event: ${JSON.stringify(event)}`);

            // Handle the event by assigning it to a specific team
            const eventRecord = new Event(event);  // Save the event to the database
            await eventRecord.save();
            
            await handleEvent(eventRecord);
        },
    });
};

// Exporting teamMapping and assignTeam for use in simulation.js
module.exports = {teamMapping, assignTeam};

start().catch(console.error);
