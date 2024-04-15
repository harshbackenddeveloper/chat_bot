const db = require("../models");
const io = require("../index");

const user = async (req, res) => {
    res.sendFile("../public/index.html")
};


const getmessage = async () => {
    try {
        const data = await db.message.findAll();
        return data
    } catch (error) {
        return error
    }
};

const getAllMessages = async (req, res) => {
    try {
        const data = await db.message.findAll();
        res.json({ message: "Messages fetched successfully", msg: data[0].textMessage })
    } catch (error) {
        res.json({ message: "Error in fetching the messages", error: error })
    }
};

const addMessages = async (req, res) => {
    try {
        const data = await db.message.create(req.body);
        res.json({ message: "messages added successfully", response: data })
    } catch (error) {
        res.json({ message: "Error in adding the messages", error: error })
    }
};



const sendMessage = (req, res) => {
    const { message } = req.body;

    // Emit message to all connected clients or to specific clients
    // io.emit('chat message', message);

    res.json({ success: true, message: 'Message sent successfully' });
};



module.exports = {
    user,
    getAllMessages,
    addMessages,
    sendMessage,
    getmessage
}