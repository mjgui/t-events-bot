const queries = require('../db/queries');
const messenger = require('../messenger');
const  {bot_name} = require('../config');

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to me at @" + bot_name;
        messenger.send(msg.chat.id, text);
        return;
    }
    const text = await queries.getWaitTimeMessage();
    messenger.send(msg.from.id, text);

}
