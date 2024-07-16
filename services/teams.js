// consumes events from kafka, checks worker availability and assigns events to them
// logs event handling or increments stress levels if no workers are available

const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
require('dotenv').config();

// Check environment variable
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

const start = async () => {
    await connectMongoDB();

    await consumer.connect();
    console.log('Kafka Consumer connected');

    await consumer.subscribe({ topic: 'events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log(`Received event: ${JSON.stringify(event)}`);

            // Process the event here
        },
    });
};

start().catch(console.error);
