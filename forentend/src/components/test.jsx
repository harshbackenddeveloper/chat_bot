import React, { useState } from 'react'
import axios from "axios";
import '../assets/style/ChatBod.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TestChat = () => {

  const [apiData, setApiData] = useState("");
  const [question, setQuestion] = useState("");

  const hitRequest = async () => {
    try {
      console.log("loading.......");
      setApiData("Loading......")
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCJvPYivT7PGqzEHAgB7aKIZiRhYnFEQ9M",
        method: "post",
        data: {
          contents: [
            { parts: [{ text: question }] }]
        }
      })
      console.log("response", response);
      console.log("ress", response.data.candidates[0].content.parts[0].text);
      setApiData(response.data.candidates[0].content.parts[0].text)
    } catch (error) {
      console.log(error);
    }
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>

      <h1>Hello im testing</h1>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} cols="30" rows="10">
        <input type="text" placeholder='enter question' />
      </textarea>
      <button onClick={hitRequest}>GetData</button>
      <pre>{apiData}</pre>

      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          {/* <ChildModal /> */}
        </Box>
      </Modal>


    </>
  )
}

export default TestChat
