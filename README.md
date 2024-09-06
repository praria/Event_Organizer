# marry_me_organizer

# Problem Statement
********************

Congratulations, your best friend is getting married, and he had the brilliant idea to appoint you as the person responsible for setting everything up for the ceremony! Not only is he looking to save some money on the whole event, but he presented to you what could be a very lucrative business opportunity in the Marriage celebration industry.
The main drive for what you discussed with your friend is keeping stress levels, for both guests and wedding couple, at low, by optimizing how different situations are handled on the big day.

# Objective
**************
To design, develop, and test an application capable of receiving multiple events, and delivering them to the appropriate teams, according to priority and team members availability.

# Solution
*****************
The entrypoint of your application is the Coordinator role. They are responsible
for receiving events, checking if they are valid, and sending them to the next step of the application: The Marry Me Organizer. This second part is responsible for distributing events according to their Type and Priority.
After passing by the Organizer, Events are received by Teams (Waiters, Catering, Security, Officiant, Cleaning, etc.), which then checks availability of Workers, under that team, to deal with each event.

If an event is due (wasn't dealt before the timeframe is up), it's discarded, and a Stress level is to be incremented. Every event (solved or unsolved, along with Stress level and any other useful information should be properly logged).

# Entities
****************

# Coordinators:
● Receive events
● Validate events

# Workers:
● Handle( ) events. ● Attributes:
                     ○ Team: [Security | Clean Up | Catering | Officiant | Waiters]
                     ○ Current_status: [Idle | Working]

# Teams
● Receive valid events from the Organizer.
● Check Workers availability and distribute events, organized by priority.
● Attributes:
       ○ Routine: [Standard | Intermittent | Concentrated]

# Guests
● Generate events.
● Get Stressed or Happy, depending on how fast events are dealt with.
● Attributes:
       ○ Current_status: [Happy | Stressed]

# Events
● Attributes:
       ○ Event_type: [Person Fell | Broken Glass | Dirty Table | Brawl | Missing Rings | Missing Bride | Missing Groom | Feeling Ill | Injured Kid | Not on the list | Bad Food | Music too Loud | Music too Low ]
       ○ Priority: [High | Medium | Low]
       ○ Description: [text field]


# Unset
# // Initial Event type by Team
Security {
       brawl,
       not_on_list,
       person_fell,
       injured_kid
       }
Clean_up {
       dirty_table,
       broken_glass
       }
Catering {
       bad_food,
       music_too_loud,
       music_too_low,
       feeling_ill
       }
Officiant {
       missing_rings,
       missing_bride,
       missing_groom
       }
Waiters {
       broken_glass,
       person_fell,
       injured_kid
       feeling_ill
       }

# Unset
# // Priorities timeframes
   High   ->  5 minutes (5 second in the simulation)
   Medium -> 10 minutes (10 second in the simulation)
   Low    -> 15 minutes (15 second in the simulation)
   //Routines timeframes
   Standard     -> 20 seconds working, 5 seconds idle;
   Intermittent -> 5 seconds working, 5 seconds idle;
   Concentrated -> 60 seconds working, 60 seconds idle;

# Wedding simulations
*********************
Each simulation will consist of a 6 minutes wedding (each minute will be
equivalent to an hour, each second, equivalent to a minute). In this time frame, each simulation will generate different payloads of events that will be delivered to the entrypoint of the application (the Coordinators).
At the beginning, all guests are with the Happy status. Each time an event is not dealt within its priority time frame, a guest Stress Mark is added to the simulation result.
Each event has a type (which allows the coordinator to validate and address it to a team that is able to act on it), and a priority (which translates to the timeframe the event has to be dealt with, before a guest becomes stressed).
The goal is to deal with all the events without increasing the overall stress level too much. 

# Unset
# // Event format example
   event {
          event_type: feeling_ill,
          priority:  medium,
          description: guest has stomac ache after eating 5 pieces of cake,
   }

# Stack and Technologies Used
*****************************
● Kafka for message brokering
●  Node.js
●  MangoDB

# Deliverables
*************
● README
● Repository with proper instructions to build locally or link to live application
● Final report with "stress level" for each Wedding Simulation


# Outcomes
***********
● ImplementationofEvent-DrivenArchitecture:Studentsshould demonstrate a clear understanding of event-driven architecture principles and how they apply to the project. This includes designing systems where components communicate asynchronously through events.
● IntegrationwithMessagingSystems:Successfulintegrationwith messaging systems is crucial. Students should demonstrate their ability to configure, deploy, and utilize these systems effectively within their project.
● ReliabilityandFaultTolerance:Thesystemshouldberesilientto failures at different levels. Students should implement strategies such as message retries, dead letter queues, and circuit breakers to ensure reliability and fault tolerance.
● MonitoringandLogging:Implementingrobustmonitoringand logging solutions is essential for troubleshooting and maintaining the system. Students should demonstrate their ability to collect and analyze metrics, as well as handle logging and error tracking effectively.
● DocumentationandPresentation:Cleardocumentationoutlining the architecture, design decisions, and implementation details should be provided. Additionally, students should be able to effectively communicate their project through a presentation.


**********************************************************************************************


*************************
* To run the Application *
*************************


Start zookeeper server:
*************************
run command: bin/zkServer.sh start-foreground (any argument--- {start|start-foreground|stop|version|restart|status|print-cmd})
server validation: echo stat | nc localhost 2181



Start Kafka server:
********************
run commannd: bin/kafka-server-start.sh config/server.properties
to run in background: bin/kafka-server-start.sh -daemon config/server.properties
validation: echo dump | nc localhost 2181 | grep brokers

Start Mongodb server
*********************
1. export path to mongodb bin folder by configuring .zshrc file 
2. run the command: source .zshrc
2. create data/da folder in home directory
3. Make sure mongod binary file has execution permission (chmod +x /Users/prakash/mongodb-macos-x86_64-5.0.27/bin/mongod
4. run the following command:  mongod --dbpath=/Users/prakash/data/db (path to your database)

To stop Mongodb server
1. ps aux | grep mongod (To find PID)
2. kill PID


Start the Coordinator Service
******************************
node services/coordinator.js

Start the Event Organizer Service:
*********************************
node services/eventOrganizer.js

Start the Team Service:
************************
node services/teams.js

Run the Simulation:
*********************
node simulation/simulation.js


********************************************************************************************
We may create a bash file to run the above commands. For example:

# Navigate to zookeeper folder
echo "Navigation to apache-zookeeper-3.8.4-bin"
cd apache-zookeeper-3.8.4-bin

# Start Zookeeper
echo "Starting Zookeeper..."
bin/zkServer.sh start &
sleep 10 # Give some time for Zookeeper to start

# Navigate to Kakfa folder
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


## OR run the bash file to run the all the components automatically
*******************************************************************
 # Bash file: run_marry_me.sh  

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

# Navigate to Kakfa folder
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

************************************************************************
