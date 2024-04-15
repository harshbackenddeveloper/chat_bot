const db = require("../models");
const io = require("../index");
const user = async (req, res) => {
    res.sendFile("../public/index.html")
};
// message
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
        res.json({ message: "Messages fetched successfully", msg: data })
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
// User
const addUser = async (body) => {
    try {
        console.log(body);
        const dataObj = {
            firstName       : body.firstName,
            lastName        : body.lastName,
            email           : body.email,
            password        : body.password,
            socket_id       : body.socket_id,
            status          : true,
        }
        const data = await db.User.create(dataObj);
        return data
    } catch (error) {
        return error
    }
};
const getUser = async (body) => {
    try {
        const data = await db.User.findAll();
        return data
    } catch (error) {
        return error
    }
};
const getMatches = async()=>{
    const data = {
        textMessage: 'Hello,Please select one of the options, eg - 1,2...',
        sender: 'chatbot',
        options: {
            type: 'Gender',
            option1: `1.Male`,
            option2: `2.Female`,
        }
    };
    return data;
}
const registerMail = async()=>{
    const data = {
        textMessage: 'Verification link has sent to your mail to verify',
        sender: 'chatbot'
    };
    return data;
}
const aboutUs = async()=>{
    const data = {
        textMessage: 'This is a matrimonial website, Please select an option for more info',
        sender: 'chatbot',
        options: {
            type: 'Contact',
            option1: `1.Visit this link for more info `,
            option2: `2.Contact admin`,
        }
    };
    return data;
}
module.exports = {
    user,
    getAllMessages,
    addMessages,
    getmessage,
    addUser,
    getUser,
    getMatches,
    registerMail,
    aboutUs
}