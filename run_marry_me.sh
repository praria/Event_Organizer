#!/bin/bash

# Stop existing MongoDB, Kafka, and Zookeeper processes
echo "Stopping existing MongoDB, Kafka, and Zookeeper processes..."

# Stop MongoDB
pkill mongod

# Stop Kafka
pkill -f 'kafka-server-start.sh'

# Stop Zookeeper
pkill -f 'zkServer.sh'

# Stop Node.js services
pkill -f 'node services/coordinator.js'
pkill -f 'node services/eventOrganizer.js'
pkill -f 'node services/teams.js'

# Change to home directory
echo "Changing to home directory"
cd ~

# Navigate to zookeeper folder
echo "Navigation to apache-zookeeper-3.8.4-bin"
cd apache-zookeeper-3.8.4-bin

# Start Zookeeper
echo "Starting Zookeeper..."
bin/zkServer.sh start &
sleep 10 # Give some time for Zookeeper to start

# Navigate to Kafka folder
echo "Navigation to kafka_2.13-3.7.0"
cd ~
cd kafka_2.13-3.7.0

# Start Kafka
echo "Starting Kafka..."
bin/kafka-server-start.sh -daemon config/server.properties &
sleep 10 # Give some time for Kafka to start

# Source .zshrc
echo "Sourcing .zshrc..."
cd ~
source ~/.zshrc

# Start MongoDB
echo "Starting MongoDB..."
mongod --dbpath=/Users/prakash/data/db &
sleep 10 # Give some time for MongoDB to start

# Start Coordinator service
echo "Starting Coordinator service..."
cd Documents/mscs/enggLab4-marryMe/marry_me_organizer
node services/coordinator.js &
sleep 5 # Give some time for Coordinator service to start

# Start Event Organizer service
echo "Starting Event Organizer service..."
node services/eventOrganizer.js &
sleep 5 # Give some time for Event Organizer service to start

# Start Teams service
echo "Starting Teams service..."
node services/teams.js &
sleep 5 # Give some time for Teams service to start

# Start Simulation in a new terminal window
osascript -e 'tell application "Terminal" to do script "cd Documents/mscs/enggLab4-marryMe/marry_me_organizer; echo Starting Simulation...; node simulation/simulation.js"'         

