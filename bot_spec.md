users only allowed to be in one queue at a time
# commands:

### /help 
gives an inline keyboard for participants vs admins, then text instructions
#for participants:

## for participants:
anyone can use these commands, but only via direct message to the bot (those queueing as a group should have one person queue for them)

### /timeslots
get a text-only message with the timeslots and their descriptions

### /joinQueue
get an inline keyboard to select the timeslot they want to register for

### /leaveQueue
confirmation dialogue

### /waitTime
get the expected waiting time

### /ticket 
new command, replies with a message stating participant's timeslot and username

## for admins:
these commands can only be by authorized individuals or in authorized chats (set in environment variable "admins")

### /setMax
set max number of people in queue

### /setTime
set waiting time

### /getAll
get all the users registered, organized by timeslot

## botfather command setting
timeslots - view list of timeslots  
waittime - check the waiting time  
joinqueue - select a timeslot to queue for  
leavequeue - stop queueing for your current timeslot (with confirmation dialogue)  
ticket - new command, prints out a message stating participant's timeslot and username  
about - view information about the bot  
help - get the list of commands  
setmax - (admin) update the max queue length per timeslot. Example: `/setmax 10`  
settime - (admin) update the estimated waiting time in minutes. Example: `/settime 10`  
getall - (admin) get the usernames of all participants by timeslot 

# database:
## variables table
each row represents a variable name and its value(stringified)  
columns: name(pk), value  
rows: wait time, max length per slot

## stations table
each row represents a station

columns: station name (pk), groupID (group with the stationmasters), time per person, tablename (for queue, or use stationname), queue length, current queue number, ping text (to be sent to front participant)

## table of participants
stores the queue they are in

columns: telegramID (pk), station name they are queueing for

## table representing a station's queue
each row represents a person

columns: queue number (pk, unique), telegramID, hasLeft (boolean, default false)

#.env
BOT_TOKEN=  
BOT_NAME=  
API_URL=https://api.telegram.org/bot  
SERVER_URL=  
DATABASE_URL=  
DB_DATABASE=  
DB_HOST=  
DB_PASSWORD=  
DB_USER=  
DEBUG=  
ADMINS=