Instructions:
1. To register as an admin, use @WhoAmIJrBot to get your user ID or the chat ID and send @nicktohzyu. Admin control can be given to a group chat or a direct message chat.  
2. Send @nicktohzyu the list of timeslots  
3. Set the max queuelength and estimated time per participant (can be changed on the fly)  


Flow for participants:  
Use /timeslots to see the number of places available to each timeslot  
You can only register for one timeslots at a time.  
Use /joinqueue to join a queue  
You can then use /waittime to see the expected waiting time and the number of people ahead of you in the queue  
You can stop queueing with /leavequeue

Flow for admins:  
Get info on the queue length and current settings with /queueinfo  
You can update the max queue length and estimated time per participant (in minutes) with /setmax and /settime  
Get the telegram username of the person at the front with /getfront
Get the telegram username of everyone in the queue with /getall (this stresses the bot so please don't spam it)

To set up database:  
Create master schema directly as per sql.  
Create station tables (representing the timeslots) by adding station name in "" delimiters (follow instruction in comment). Recommended to go by numbers.
Add stations to master.stations list