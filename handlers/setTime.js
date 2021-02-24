const queries = require('../db/queries');
const messenger = require('../messenger');

// for admins in group chat to get the length of their queue
module.exports.init = async function (msg) {
    const isAdmin = queries.isAdmin(msg.chat.id);
    if (!isAdmin) {
        const text = "Error, you are unauthorized";
        messenger.send(msg.chat.id, text);
    } else {
        let newTime;
        try{
            newTime = parseInt(msg.text.split(" ")[1]);
        } catch (e) {
            const text = "Error, invalid input. This command is used to update the estimated waiting time per participant in minutes." +
                "\nExample format:\n" +
                "/settime 5";
            messenger.send(msg.chat.id, text);
            return;
        }
        if(!Number.isInteger(newTime)) {
            throw "not a valid integer";
        }
        await queries.setWaitTime(newTime);
        const text = "Successfully updated the waiting time.";
        messenger.send(msg.chat.id, text);
    }
}
