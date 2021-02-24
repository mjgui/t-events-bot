const queries = require('../db/queries');
const messenger = require('../messenger');

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
            const text = "Error, invalid input. This command is used to update the max queue length per slot." +
                "If it has been reached, participants will not be able to join the queue." +
                "\nExample format:\n" +
                "/setmax 10";
            messenger.send(msg.chat.id, text);
            return;
        }
        if(!Number.isInteger(newTime)) {
            throw "not a valid integer";
        }
        await queries.setWaitTime(newTime);
        const text = "Successfully updated the max queue length per slot.";
        messenger.send(msg.chat.id, text);
    }
}
