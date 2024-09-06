// consumes events from kafka, stores them in DB, processes and distributes validated events to appropriate teams topics in kafka
// mongoose for MongoDB interaction

const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
    clientId: 'event-organizer',
    
    brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'event-group' });

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


const start = async () => {
    await connectMongoDB();
    await consumer.connect();
    console.log('Kafka Consumer connected');
    await consumer.subscribe({ topic: 'events', fromBeginning: true });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log('Event received:', event);

            // Process and store the event in MongoDB
            const Event = require('../models/event');
            const newEvent = new Event(event);
            await newEvent.save();
        }
    });
};

start().catch(console.error);
