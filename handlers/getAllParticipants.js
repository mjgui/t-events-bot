const queries = require('../db/queries');
const messenger = require('../messenger');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    const isAdmin = queries.isAdmin(msg.chat.id);
    if (!isAdmin) {
        const text = "Error, you are unauthorized";
        messenger.send(msg.chat.id, text);
        return;
    }
    const stationDict = await queries.getAllParticipants();
    // await Promise.all(promisedUsernames);
    let text = "List of participants by timeslots:";
    for (const [stationName, handles] of Object.entries(stationDict)) {
        text += `\n\n${stationName}:`
        for (let i = 0; i < handles.length; i++) {
            text += `\n${i+1}: ${handles[i]}`;
        }
    }
    messenger.send(msg.chat.id, text);
}
