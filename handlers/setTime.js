const queries = require('../db/queries');
const messenger = require('../messenger');

module.exports.init = async function (msg) {
    const isAdmin = queries.isAdmin(msg.chat.id);
    if (!isAdmin) {
        const text = "Error, you are unauthorized";
        messenger.send(msg.chat.id, text);
        return;
    }
    let newTime;
    try {
        newTime = parseInt(msg.text.split(" ")[1]);
    } catch (e) {
        sendErrorMsg();
        return;
    }
    if (!Number.isInteger(newTime)) {
        sendErrorMsg();
        return;
    }
    await queries.setWaitTime(newTime);
    const text = "Successfully updated the waiting time.";
    messenger.send(msg.chat.id, text);

    function sendErrorMsg(){
        const text = "Error, invalid input. This command is used to update the estimated waiting time in minutes." +
            "\nExample format:\n" +
            "/settime 5";
        messenger.send(msg.chat.id, text);
    }
}
