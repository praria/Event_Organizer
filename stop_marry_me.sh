#!/bin/bash

echo "Stopping all Marry Me services..."

# Stop Node.js services
echo "Stopping Node.js services..."
pkill -f "coordinator.js"
pkill -f "eventOrganizer.js"
pkill -f "teams.js"
pkill -f "simulation.js"

# Stop Kafka
echo "Stopping Kafka..."
cd ~/kafka_2.13-3.7.0
bin/kafka-server-stop.sh 2>/dev/null || pkill -f kafka

# Stop Zookeeper
echo "Stopping Zookeeper..."
cd ~/apache-zookeeper-3.8.4-bin
bin/zkServer.sh stop 2>/dev/null || pkill -f zookeeper

# Stop MongoDB
echo "Stopping MongoDB..."
pkill mongod

echo "All services stopped!"

