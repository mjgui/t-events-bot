require('dotenv').config()
module.exports.token = process.env.BOT_TOKEN
module.exports.server_url = process.env.SERVER_URL //no uses?
module.exports.api_url = process.env.API_URL + module.exports.token + '/'
// module.exports.secret_url = process.env.SERVER_URL+process.env.BOT_TOKEN
module.exports.bot_name = process.env.BOT_NAME
module.exports.debug = JSON.parse(process.env.DEBUG)
module.exports.admins = JSON.parse(process.env.ADMINS) //array of user id

//testing for heroku env variables
// console.log("token: ", module.exports.token);
// console.log("server url: ", module.exports.server_url);
// console.log("api_url: ", module.exports.api_url);
// console.log("bot_name: ", module.exports.bot_name);

module.exports.db_config = {
    user: process.env.DB_USER, //env var: PGUSER
    database: process.env.DB_DATABASE, //env var: PGDATABASE
    password: process.env.DB_PASSWORD, //env var: PGPASSWORD
    host: process.env.DB_HOST, // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports.help =
`For participants:
/timeslots - view list of timeslots
/waittime - check the waiting time  
/joinqueue - select a timeslot to queue for  
/leavequeue - stop queueing for your current timeslot (with confirmation dialogue)  
/ticket - new command, prints out a message stating participant's timeslot and username  
/about - view information about the bot  
/help - get the list of commands  

For admins:
/setmax - (admin) update the max queue length per timeslot. Example: \`/setmax 10\`
/settime - (admin) update the estimated waiting time in minutes. Example: \`/settime 10\`
/getall - (admin) get the usernames of all participants by timeslot (slow)`;
module.exports.about =
`Welcome to Tembusu College's Registration Of New and Novel Interactive Events (RONNIE) bot. To participate in the CSC event, please register for a timeslot and show your /ticket upon arrival.

This bot was built by Tembusian Nicholas Toh (@nicktohzyu)`;
module.exports.start = "Bot started." + "\n\n" + module.exports.about + "\n\n" + module.exports.help;
module.exports.websiteText = ``;

module.exports.superusers = [653601805] //array of user id


module.exports.waitTimeMessage = `The current waiting time is %s minutes`
