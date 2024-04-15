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
const { getmessage } = require('./controller/user.controller');
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
        textMessage: 'Welcome! How can I assist you?',
        sender: 'chatbot',
        options: {
            option1: `1. Hi `,
            option2: `2. Hello `,
            option3: `3. About Us`
        }
    }
    socket.emit('chat message', JSON.stringify(data));


    socket.on('user_message', async (message) => {
        console.log(111, message)
        const allmessage = await getmessage();
        const response = allmessage;

        socket.emit('botMessage', response);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});


const port = process.env.PORT || 9000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

