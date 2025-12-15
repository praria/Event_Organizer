# marry_me_organizer

## Problem Statement

Congratulations, your best friend is getting married, and he had the brilliant idea to appoint you as the person responsible for setting everything up for the ceremony! Not only is he looking to save some money on the whole event, but he presented to you what could be a very lucrative business opportunity in the Marriage celebration industry.

The main drive for what you discussed with your friend is keeping stress levels, for both guests and wedding couple, at low, by optimizing how different situations are handled on the big day.

## Objective

To design, develop, and test an application capable of receiving multiple events, and delivering them to the appropriate teams, according to priority and team members availability.

## Solution

The entrypoint of your application is the Coordinator role. They are responsible for receiving events, checking if they are valid, and sending them to the next step of the application: The Marry Me Organizer. This second part is responsible for distributing events according to their Type and Priority.

After passing by the Organizer, Events are received by Teams (Waiters, Catering, Security, Officiant, Cleaning, etc.), which then checks availability of Workers, under that team, to deal with each event.

If an event is due (wasn't dealt before the timeframe is up), it's discarded, and a Stress level is to be incremented. Every event (solved or unsolved, along with Stress level and any other useful information should be properly logged).

## Entities

### Coordinators

- Receive events
- Validate events

### Workers

- Handle events
- **Attributes:**
  - Team: [Security | Clean Up | Catering | Officiant | Waiters]
  - Current_status: [Idle | Working]

### Teams

- Receive valid events from the Organizer
- Check Workers availability and distribute events, organized by priority
- **Attributes:**
  - Routine: [Standard | Intermittent | Concentrated]

### Guests

- Generate events
- Get Stressed or Happy, depending on how fast events are dealt with
- **Attributes:**
  - Current_status: [Happy | Stressed]

### Events

- **Attributes:**
  - Event_type: [Person Fell | Broken Glass | Dirty Table | Brawl | Missing Rings | Missing Bride | Missing Groom | Feeling Ill | Injured Kid | Not on the list | Bad Food | Music too Loud | Music too Low]
  - Priority: [High | Medium | Low]
  - Description: [text field]

## Event Type by Team

### Security
```
brawl
not_on_list
person_fell
injured_kid
```

### Clean Up
```
dirty_table
broken_glass
```

### Catering
```
bad_food
music_too_loud
music_too_low
feeling_ill
```

### Officiant
```
missing_rings
missing_bride
missing_groom
```

### Waiters
```
broken_glass
person_fell
injured_kid
feeling_ill
```

## Timeframes

### Priorities
- **High** → 5 minutes (5 seconds in the simulation)
- **Medium** → 10 minutes (10 seconds in the simulation)
- **Low** → 15 minutes (15 seconds in the simulation)

### Routines
- **Standard** → 20 seconds working, 5 seconds idle
- **Intermittent** → 5 seconds working, 5 seconds idle
- **Concentrated** → 60 seconds working, 60 seconds idle

## Wedding Simulations

Each simulation will consist of a 6 minutes wedding (each minute will be equivalent to an hour, each second, equivalent to a minute). In this time frame, each simulation will generate different payloads of events that will be delivered to the entrypoint of the application (the Coordinators).

At the beginning, all guests are with the Happy status. Each time an event is not dealt within its priority time frame, a guest Stress Mark is added to the simulation result.

Each event has a type (which allows the coordinator to validate and address it to a team that is able to act on it), and a priority (which translates to the timeframe the event has to be dealt with, before a guest becomes stressed).

The goal is to deal with all the events without increasing the overall stress level too much.

### Event Format Example

```json
{
  "event_type": "feeling_ill",
  "priority": "medium",
  "description": "guest has stomach ache after eating 5 pieces of cake"
}
```

## Stack and Technologies Used

- Kafka for message brokering
- Node.js
- MongoDB

## Deliverables

- README
- Repository with proper instructions to build locally or link to live application
- Final report with "stress level" for each Wedding Simulation

## Outcomes

- **Implementation of Event-Driven Architecture**: Students should demonstrate a clear understanding of event-driven architecture principles and how they apply to the project. This includes designing systems where components communicate asynchronously through events.

- **Integration with Messaging Systems**: Successful integration with messaging systems is crucial. Students should demonstrate their ability to configure, deploy, and utilize these systems effectively within their project.

- **Reliability and Fault Tolerance**: The system should be resilient to failures at different levels. Students should implement strategies such as message retries, dead letter queues, and circuit breakers to ensure reliability and fault tolerance.

- **Monitoring and Logging**: Implementing robust monitoring and logging solutions is essential for troubleshooting and maintaining the system. Students should demonstrate their ability to collect and analyze metrics, as well as handle logging and error tracking effectively.

- **Documentation and Presentation**: Clear documentation outlining the architecture, design decisions, and implementation details should be provided. Additionally, students should be able to effectively communicate their project through a presentation.

---

## To Run the Application

### Start Zookeeper Server

**Run command:**
```bash
bin/zkServer.sh start-foreground
```

*Note: Any argument can be used: `{start|start-foreground|stop|version|restart|status|print-cmd}`*

**Server validation:**
```bash
echo stat | nc localhost 2181
```

### Start Kafka Server

**Run command:**
```bash
bin/kafka-server-start.sh config/server.properties
```

**To run in background:**
```bash
bin/kafka-server-start.sh -daemon config/server.properties
```

**Validation:**
```bash
echo dump | nc localhost 2181 | grep brokers
```

### Start MongoDB Server

1. Export path to MongoDB bin folder by configuring `.zshrc` file
2. Run the command: `source .zshrc`
3. Create `data/db` folder in home directory
4. Make sure mongod binary file has execution permission:
   ```bash
   chmod +x /Users/prakash/mongodb-macos-x86_64-5.0.27/bin/mongod
   ```
5. Run the following command:
   ```bash
   mongod --dbpath=/Users/prakash/data/db
   ```
   *(Use the path to your database)*

### To Stop MongoDB Server

1. Find the process ID:
   ```bash
   ps aux | grep mongod
   ```
2. Kill the process:
   ```bash
   kill <PID>
   ```

### Start the Coordinator Service

```bash
node services/coordinator.js
```

### Start the Event Organizer Service

```bash
node services/eventOrganizer.js
```

### Start the Team Service

```bash
node services/teams.js
```

### Run the Simulation

```bash
node simulation/simulation.js
```

---

## To Stop the Application

When stopping the application, you should stop services in the following order to ensure clean shutdown:

### Stop Node.js Services

If you started the services in separate terminal windows, you can stop them by pressing `Ctrl+C` in each terminal window.

**To stop all Node.js processes (Coordinator, Event Organizer, Teams, Simulation):**

1. Find all Node.js processes:
   ```bash
   ps aux | grep node
   ```

2. Kill specific processes by name:
   ```bash
   pkill -f "coordinator.js"
   pkill -f "eventOrganizer.js"
   pkill -f "teams.js"
   pkill -f "simulation.js"
   ```

   Or kill all Node.js processes at once:
   ```bash
   pkill node
   ```

### Stop Kafka Server

1. Find the Kafka process:
   ```bash
   ps aux | grep kafka
   ```

2. Kill the process:
   ```bash
   kill <PID>
   ```

   Or use the Kafka stop script (if available):
   ```bash
   cd ~/kafka_2.13-3.7.0
   bin/kafka-server-stop.sh
   ```

### Stop Zookeeper Server

1. Find the Zookeeper process:
   ```bash
   ps aux | grep zookeeper
   ```

2. Kill the process:
   ```bash
   kill <PID>
   ```

   Or use the Zookeeper stop script:
   ```bash
   cd ~/apache-zookeeper-3.8.4-bin
   bin/zkServer.sh stop
   ```

### Stop MongoDB Server

1. Find the MongoDB process:
   ```bash
   ps aux | grep mongod
   ```

2. Kill the process:
   ```bash
   kill <PID>
   ```

### Quick Stop Script

You can create a script to stop all services at once. Create a file named `stop_marry_me.sh`:

```bash
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
```

**To use the stop script:**

1. Save the content above to a file named `stop_marry_me.sh`
2. Make it executable:
   ```bash
   chmod +x stop_marry_me.sh
   ```
3. Run it:
   ```bash
   ./stop_marry_me.sh
   ```

---

## Automated Setup Script

You can create a bash file to run all the above commands automatically. Here's an example:

### Bash File: `run_marry_me.sh`

```bash
#!/bin/bash

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
```

**To use the script:**

1. Save the content above to a file named `run_marry_me.sh`
2. Make it executable:
   ```bash
   chmod +x run_marry_me.sh
   ```
3. Run it:
   ```bash
   ./run_marry_me.sh
   ```
