import React, { useEffect, useMemo, useState } from 'react'
import '../assets/style/ChatBod.css'
import ClearIcon from '@mui/icons-material/Clear';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {makeApi} from '../helper/helper'

const TestChat = () => {
  const socket = useMemo(() => io("http://localhost:9000"), []);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('')
  const [socketId, setSocketId] = useState('')
  const [allMessages, setAllMessages] = useState([])
  const [messageId, setMessageId] = useState('')

  const handleToggle = () => {
    setOpen(!open);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return; // check if message is empty then do not send

    const messageData = {
      value: message,
      id: messageId
    }

    socket.emit("user-message", messageData);
    setAllMessages([...allMessages, { textMessage: message, type: "outgoing" }]);
    setmessage('')
  }

  //here we are connecting soket 
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected', socket.id);
      setSocketId(socket.id);
    })

    socket.on("chat message", (data) => {
      const parseData = JSON.parse(data)
      console.log("Welcome message from backend", parseData);
      setAllMessages((data) => [...data, parseData])
    })

    socket.on("botMessage", (botMessage) => {
      const parseMessage = JSON.parse(botMessage);
      console.log("after sending message", parseMessage);
      setAllMessages((data) => [...data, parseMessage])
      setMessageId(parseMessage.id)
    })
  }, [socket])


  const getAllNotification = async() => {
    const notification = await makeApi('post', "/register", userData)
    console.log("notification", notification);
  }


//  let te =  setInterval(() => {
//     getAllNotification
//   }, 10000);




  return (
    <>
      <div>
        <h4>Hello welcome to chatbot</h4>
        <div className='RobotParent'>
          {!open && <ChatIcon onClick={handleToggle} className='RobotIcon' />}
          {open && (
            <div className="chat_box">
              <div className="head">
                <div className="user">
                  <div className="avatar">
                    <img src="https://picsum.photos/g/40/40" />
                  </div>
                  <div className="name">Helper-Bot</div>
                </div>

                <div>
                  <ClearIcon onClick={handleToggle} />
                </div>
              </div>

              <div className="body">
                {allMessages.map((item, index) => (
                  <div className={`message ${item.sender}`} key={index}>
                    <div className="bubble">
                      {/* {console.log("=====all Messages=====", item)} */}
                      <p>{item && item.textMessage}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="foot">
                <form onSubmit={handleSubmit}>
                  <input type="text" className="msg" placeholder="Type a message..." value={message} onChange={(e) => setmessage(e.target.value)} />
                  <button type="submit"><SendIcon /></button>
                </form>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TestChat