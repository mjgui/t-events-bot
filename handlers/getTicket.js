const queries = require('../db/queries');
const messenger = require('../messenger');
const  {bot_name} = require('../config');

const notQueuedMsg = "Error: you're not currently in a queue!";

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to me at @" + bot_name;
        messenger.send(msg.chat.id, text);
        return;
    }
    const userId = msg.from.id;
    const stationID = await queries.getUserStationID(userId);
    if (stationID === null) {
        messenger.send(msg.from.id, notQueuedMsg);
        return;
    }
    const stationName = await queries.getStationName(stationID);
    const username = msg.from.username;
    const text = `Ticket for @${username}, registered for ${stationName}`
    messenger.send(msg.from.id, text);
}
