const express = require('express');
const path = require('path');
const Sequelize = require("sequelize");
const app = express();
const { Server } = require('socket.io');
const http = require('http').Server(app);
require("./config/config.json");
require('dotenv');
const cors = require('cors');
const userRouter = require("./routes/user.route");
const { getmessage,getMatches,registerMail,aboutUs } = require('./controller/user.controller');
app.use(express.static(path.resolve('./public')));

const io = new Server(http, { cors: { origin: "*", } });

app.use(cors());

//connect to db 
const sequelize = new Sequelize({
    username: 'root',
    password: 'root',
    database: 'chatbotdb',
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.use("/", userRouter);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    const data = {
        textMessage: 'Welcome! How can I assist you? , Please choose one of the below options',
        sender: 'chatbot',
        options: {
            option1: `1. Find Matches`,
            option2: `2. Register Your Email`,
            option3: `3. About Us`
        }
    }
    socket.emit('chat message', JSON.stringify(data));
    socket.on('user-message', async (message) => {
        console.log(1212, message);
        let response;
        if (message === '1') {
            
            const response = await getMatches();
            socket.emit('botMessage', JSON.stringify(response));
        } else if (message === '2') {
            const response = await registerMail();
            socket.emit('botMessage', response);
        } else if (message === '3') {
            response = await aboutUs();
            socket.emit('botMessage', JSON.stringify(response));
        } else {
            response = {
                textMessage: 'Information not found,Please select out of these options',
                sender: 'chatbot'
            }
            socket.emit('botMessage', JSON.stringify(response));
        }
    });
    socket.on('addUser', async (socketId) => {
        // get all the user from database
        const allmessage = await addUser(socketId);
        // emit the data from database
        socket.emit('botMessage', allmessage);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});










const port = process.env.PORT || 9000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

