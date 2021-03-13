const queries = require('../db/queries');
const messenger = require('../messenger');

module.exports.init = async function (msg) {
    const isAdmin = queries.isAdmin(msg.chat.id);
    if (!isAdmin) {
        const text = "Error, you are unauthorized";
        messenger.send(msg.chat.id, text);
    } else {
        let newLength;
        try{
            newLength = parseInt(msg.text.split(" ")[1]);
        } catch (e) {
            sendErrorMsg();
            return;
        }
        if(!Number.isInteger(newLength)) {
            sendErrorMsg();
            return;
        }
        await queries.setMaxQueueLength(newLength);
        const text = "Successfully updated the max queue length per slot.";
        messenger.send(msg.chat.id, text);

        function sendErrorMsg(){
            const text = "Error, invalid input. This command is used to update the max queue length per slot." +
                "If it has been reached, participants will not be able to join the queue." +
                "\nExample format:\n" +
                "/setmax 10";
            messenger.send(msg.chat.id, text);
        }
    }
}
