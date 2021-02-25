const TelegramBot = require('node-telegram-bot-api');
const {about, bot_name, debug, help, start, token} = require('./config');
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
    bot = new TelegramBot(token, {webHook: {port: process.env.PORT}});
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new TelegramBot(token, {polling: true});
}

messenger.initBot(bot);

bot.on('message', (msg) => {
    if (debug) {
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
        if (tokens[1] !== bot_name) {
            return;
        }
        command = tokens[0];
    } else {
        command = msg.text.split(" ")[0];
    }
    switch (command.toLowerCase()) {
        case '/about':
            messenger.send(msg.chat.id, about);
            break;
        case '/help':
            messenger.send(msg.chat.id, help);
            break;
        case '/start':
            messenger.send(msg.chat.id, start + "\n" + about);
            break;
        //for participants:
        case '/waittime':
            waitTime.init(msg);
            break;
        case '/viewstations':
        case '/stations':
        case '/timeslots':
            viewStations.init(msg);
            break;
        case '/joinqueue':
            joinQueue.init(msg);
            break;
        case '/leavequeue':
            leaveQueue.init(msg);
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
                leaveQueue.callback(query);
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