// receives events via an HTTP API, validates incoming events and produces validated events to kafka
// Express.js to set up an http server
// kafkajs to interact with kafka

const express = require('express');
const { Kafka } = require('kafkajs');
require('dotenv').config();

const app = express();
app.use(express.json());

const kafka = new Kafka({
    clientId: 'marry_me_event_coordinator',
    brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

const start = async () => {
    await producer.connect();
    console.log('Kafka Producer connected');
};

start().catch(console.error);

app.post('/events', async (req, res) => {
    const event = req.body;

    const validEventTypes = {
        Security: ['brawl', 'not_on_list', 'person_fell', 'injured_kid', 'accident'],
        Clean_up: ['dirty_table', 'dirty_floor', 'broken_glass', 'broken_itens'],
        Catering: ['bad_food', 'music_too_loud', 'music_too_low', 'feeling_ill', 'music'],
        Officiant: ['missing_rings', 'missing_bride', 'missing_groom', 'bride', 'groom' ],
        Waiters: ['accident','broken_glass', 'person_fell', 'injured_kid', 'feeling_ill']
    };

    const isValidType = Object.values(validEventTypes).some(types => types.includes(event.event_type));
    if (!isValidType || !['High', 'Medium', 'Low'].includes(event.priority) || !event.description) {
        return res.status(400).send('Invalid event');
    }

    await producer.send({
        topic: 'events',
        messages: [{ value: JSON.stringify(event) }],
    });

    res.status(200).send('Event received');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Coordinator running on port ${PORT}`);
});
