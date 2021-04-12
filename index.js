const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const messenger = require('./messenger');
// const queries = require('./db/queries');
const viewStations = require('./handlers/viewStations');
const waitTime = require('./handlers/waitTime');
const joinQueue = require('./handlers/joinQueue');
const leaveQueue = require('./handlers/leaveQueue');
const getTicket = require('./handlers/getTicket');

const setMax = require('./handlers/setMax');
const setTime = require('./handlers/setTime');
const getAll = require('./handlers/getAllParticipants');

let bot;
if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(config.BOT_TOKEN, {webHook: {port: process.env.PORT}});
    const url = process.env.HEROKU_URL + bot.token;
    console.log("Production env, setting webhook as " + url);
    bot.setWebHook(url);
} else {
    bot = new TelegramBot(config.BOT_TOKEN, {polling: true});
}

messenger.initBot(bot);

bot.on('message', (msg) => {
    if (config.debug) {
        let message = "received message with text \"" + msg.text + "\" from \"" + msg.from.username + "\""
        if (msg.chat.hasOwnProperty("title")) {
            message += " in chat \"" + msg.chat.title + "\"";
        } else {
            message += " via direct message"
        }
        console.log(message);
    }
    let command;
    if (msg.text == null) {
        console.log("warning: message text from " + msg.from.id + " is null");
        return;
    }
    if (msg.text.includes('@')) {
        let tokens = msg.text.split('@');
        if (tokens[1] !== config.bot_name) {
            return;
        }
        command = tokens[0];
    } else {
        command = msg.text.split(" ")[0];
    }
    switch (command.toLowerCase()) {
        case '/about':
            messenger.send(msg.chat.id, config.ABOUT_MSG);
            break;
        case '/help':
            messenger.send(msg.chat.id, config.HELP_MSG);
            break;
        case '/start':
            messenger.send(msg.chat.id, config.START_MSG);
            break;
        //for participants:
        case '/waittime':
            waitTime.init(msg);
            break;
        case '/timeslots':
            viewStations.init(msg);
            break;
        case '/joinqueue':
            joinQueue.init(msg);
            break;
        case '/leavequeue':
            if(config.DISABLE_LEAVE){
                messenger.send(msg.chat.id, "Changing time slots is currently disabled by the admins.");
            } else {
                leaveQueue.init(msg);
            }
            break;
        case '/ticket':
            getTicket.init(msg);
            break;
        //for stationmasters:
        case '/setmax':
            setMax.init(msg);
            break;
        case '/settime':
            setTime.init(msg);
            break;
        case '/getall':
            getAll.init(msg);
            break;
        default:
            break;
    }
});

bot.on('callback_query', (query) => {

    let data = JSON.parse(query.data);
    if (data.hasOwnProperty("c")) {
        switch (data.c.toLowerCase()) {
            case 'join':
                joinQueue.callback(query);
                break;
            case 'leavequeue':
                if(config.DISABLE_LEAVE){
                    messenger.edit(
                        query.message.chat.id,
                        query.message.message_id,
                        null,
                        'Changing time slots is currently disabled by the admins.',
                        null);
                } else {
                    leaveQueue.callback(query);
                }
                break;
            case 'cancel':
                cancelCallback(query);
                break;
            default:
                break;
        }
    }
})

function cancelCallback(query) {
    messenger.edit(
        query.message.chat.id,
        query.message.message_id,
        null,
        'Your request has been cancelled!',
        null);
}

console.log("bot running");

// let t = queries.getStations();
// let x;