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