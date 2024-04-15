import React, { useEffect, useMemo, useState } from 'react'
import '../assets/style/ChatBod.css'
import ClearIcon from '@mui/icons-material/Clear';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";

const TestChat = () => {
  const socket = useMemo(() => io("http://localhost:9000"), []);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('')
  const [sendMessages, setSendMessages] = useState([])

  // const [socketId, setSocketId] = useState('')
  const [defaultMessage, setDefaultMessage] = useState([])

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return; // check if message is empty then do not send
    socket.emit("user_message", message);
    setSendMessages([...sendMessages, { textMessage: message, type: "outgoing" }]);
    setmessage("")
  }

  //here we are connecting soket 
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected', socket.id);
      // setSocketId(socket.id);
    })

    socket.on("chat message", (data) => {

      const parseData = JSON.parse(data)
      console.log("Welcome message from backend", parseData);

      setSendMessages((preMess) => [...preMess, parseData])
      if (data === "Welcome! How can I assist you?") {
        setSendMessages((data) => [...data, parseData]);
      }
    })

    socket.on("botMessage", (botMessage) => {
      console.log("afer sending message", botMessage);
      const incomingTextMessage = botMessage[0].textMessage;
      console.log("incomingTextMessage", incomingTextMessage);
      setSendMessages((data) => [...data, incomingTextMessage]);
    })
  }, [socket])

  console.log("sendMessages", sendMessages);

  return (
    <>
      <div className='RobotParent'>
        {!open && <ChatIcon onClick={handleToggle} className='RobotIcon' />}

        {open && (
          <div className="chat_box">
            <div className="head">
              <div className="user">
                <div className="avatar">
                  <img src="https://picsum.photos/g/40/40" />
                </div>
                <div className="name">Kai Cheng</div>
              </div>

              <div>
                <ClearIcon onClick={handleToggle} />
              </div>
            </div>

            <div className="body">

              {sendMessages.map((item, index) => (
                <div className={`message ${item.sender}`} key={index}>
                  <div className="bubble lower">
                    {console.log("=====all Messages=====", item)}
                    <p>{item ? item.textMessage : item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="foot">
              <form onSubmit={handleSubmit}>
                <input type="text" className="msg" placeholder="Type a message..." onChange={(e) => setmessage(e.target.value)} />
                <button type="submit"><SendIcon /></button>
              </form>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default TestChat
