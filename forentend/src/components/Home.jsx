import { Avatar, Card, CardHeader, Grid, IconButton, Popover, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import '../assets/style/Home.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ChatIcon from '@mui/icons-material/Chat';
import RestoreIcon from '@mui/icons-material/Restore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DoneIcon from '@mui/icons-material/Done';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddIcon from '@mui/icons-material/Add';
import { makeApi } from '../helper/helper';
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
    const navigate = useNavigate();

    const socket = useMemo(() => io("http://localhost:3020"), []);
    const [userList, setUserList] = useState('')
    const [seprateDetails, setSeprateDetails] = useState('')
    const [loginUserData, setLoginUserData] = useState('')
    const [messageData, setMessageData] = useState('')
    const [reciverID, setReciverId] = useState('')
    const [senderId, setSenderId] = useState('')
    const [socketId, setSocketId] = useState('')
    const [reciverSokcetId, setReciverSokcetId] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [prevMess, setPreMess] = useState([])

    //get login user and feth all user list 
    const LoginUserAndUserList = async () => {
        try {
            //fetch login user from localstorage 
            const localStorageData = localStorage.getItem("LoginUserId")
            const afterParse = JSON.parse(localStorageData)
            const allDataLoginUser = await makeApi('get', `/seprateDetails/${afterParse}`);
            setLoginUserData(allDataLoginUser)
            setSenderId(allDataLoginUser._id)

            //fetch user list from database 
            const allUser = await makeApi('get', '/allUser');
            const filteredUserList = (allUser.filter((item) => item._id !== allDataLoginUser._id))
            setUserList(filteredUserList)
        } catch (error) {
            console.log();
        }
    }

    //functin for open poopever
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    //function for close poopover
    const handleClose = () => {
        setAnchorEl(null);
    };

    //function for logout usr 
    const handleLogout = () => {
        localStorage.removeItem('LoginUserId');
        navigate('/login');
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //here we are getting  user message 
    const getAllMessages = async () => {
        try {
            const allMessage = await makeApi('get', '/getAllMessage');
            setPreMess(allMessage);
            console.log('prevous message', allMessage);
        } catch (error) {
            console.log(error);
        }
    }

    //here we are getting specific user details 
    const GetUserDetails = async (id) => {
        try {
            const findUser = await makeApi('get', `/seprateDetails/${id}`)
            setSeprateDetails(findUser)
            setReciverId(findUser._id)
            setReciverSokcetId(findUser.socketId)
            console.log('findUser', findUser);
        } catch (error) {
            console.log(error);
        }
    }

    //here we send message to user 
    const handleSendMessage = async (e) => {
        e.preventDefault();

        socket.emit("message", { message: messageData, room: reciverSokcetId })

        getAllMessages();

        //function to get time and date current 
        let time = new Date();

        try {
            const messagePayload = {
                senderId: senderId,
                receverId: reciverID,
                message: messageData,
                time: time,
            }
            const messageResponse = await makeApi('post', "/userMessage", messagePayload);
            console.log("messageResponse", messageResponse);
        } catch (error) {
            console.log(error);
        }
    }

    //update socket id function 
    const updateSocketId = async () => {
        try {
            const updateId = await makeApi('put', `/editUseDetails`, { socketId, senderId })
            console.log("updated data ", updateId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllMessages();
    }, [])

    useEffect(() => {
        LoginUserAndUserList();
        //here we are calling api to update socket id of user 

        socket.on('connect', () => {
            console.log('connected', socket.id);
            setSocketId(socket.id);
        })

        //here are recivig message for all user 
        socket.on('ForEveryOne', async (data) => {
            console.log("ForEveryOne", data);
            // setAllUserMessage((userMessage) => [...userMessage, data])
        })

        //here are reciving message for everyone except me 
        socket.on('EveryOneExceptMe', async (data) => {
            console.log("EveryOneExceptMe", data);
            // setexceptMeMessage((userMessage) => [...userMessage, data])
        })

        //here are handling personally message 
        socket.on('PersonallyMessage', async (data) => {
            console.log("PersonallyMessage", data);
            // setPersonallyMessage((userMessage) => [...userMessage, data])
        })
    }, [])

    useEffect(() => {
        // Call updateSocketId function only when socketId state is updated
        if (socketId) {
            updateSocketId();
            console.log('socket id function call after updation');
        }
    }, [socketId]);

    return (
        <div className='mainParent'>
            <Grid container spacing={0.2}>
                <Grid item xs={3}>
                    <div className='firstParent'>

                        {/* here we have created top download , view more button */}
                        <div>
                            <Card>
                                <CardHeader
                                    avatar={<Avatar src={loginUserData.userImg} onClick={handleClick}></Avatar>}
                                    title={loginUserData.firstName + " " + loginUserData.lastName}
                                    action={
                                        <div>
                                            <IconButton> <DownloadingIcon /> </IconButton>
                                            <IconButton> <ForwardToInboxIcon /> </IconButton>
                                            <IconButton> <ChatIcon /> </IconButton>
                                            <IconButton> <RestoreIcon /> </IconButton>
                                            <IconButton> <MoreVertIcon />  </IconButton>
                                        </div>
                                    }
                                />
                            </Card>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <Typography sx={{ p: 2 }}>
                                    <IconButton onClick={handleLogout}>
                                        <LogoutIcon />
                                    </IconButton>
                                    Logout
                                </Typography>
                            </Popover>
                        </div>

                        {/* here we have created search button for ui */}
                        <div>
                            <form className="example" action="">
                                <input type="text" placeholder="Search.." name="search" />
                                <button type="submit"><SavedSearchIcon /></button>
                            </form>
                        </div>

                        {/* here we have created cards for user name list  */}
                        <div>
                            {Array.isArray(userList) && userList.map((item) => (
                                <Card key={item._id} className='cardParent' onClick={() => GetUserDetails(item._id)}>
                                    <CardHeader
                                        avatar={<Avatar src={item.userImg} aria-label="recipe"> </Avatar>}
                                        action={
                                            <IconButton aria-label="settings">
                                                <div className='userProfileTime'>
                                                    <h6>10.02 PM</h6>
                                                    <div className='timeParent'>
                                                        <h6 className='timeChild'>2</h6>

                                                    </div>
                                                </div>
                                            </IconButton>
                                        }
                                        title={item.firstName + " " + item.lastName}
                                        subheader="life is unexpected"
                                    />
                                </Card>
                            ))}
                        </div>

                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='ChatMainParent'>
                        <div>
                            <Card >
                                <CardHeader
                                    avatar={<Avatar src={seprateDetails.userImg} aria-label="recipe"></Avatar>}
                                    action={
                                        <div>
                                            <IconButton> <StarBorderIcon /> </IconButton>
                                            <IconButton> <FileCopyIcon /> </IconButton>
                                            <IconButton> <DoneIcon /> </IconButton>
                                            <IconButton> <MoreVertIcon />  </IconButton>
                                        </div>
                                    }
                                    title={seprateDetails.firstName + " " + seprateDetails.lastName}
                                    subheader="Last Seen : today at 10.20 PM"
                                />
                            </Card>

                            <div className='chatParent'>
                                <h5>Today</h5>


                                {prevMess.map((item) => (
                                    <div key={item._id} className='leftSideChat mt-2'>
                                        <div className='leftSideChatChild'>
                                            <p>{item.message}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    </div>
                                ))}


                                <div className='rightSideChat'>
                                    <div className='rightSideChatChild'>
                                        <p>i'm fine thank you !</p>
                                        <p>10.12</p>
                                    </div>
                                </div>
                            </div>

                            <div className='TypeMessage'>
                                <form onSubmit={handleSendMessage}>
                                    <SentimentSatisfiedAltIcon />
                                    <AddIcon />
                                    <input type="text" placeholder='type message' name='message' value={messageData} onChange={(e) => setMessageData(e.target.value)} />
                                    <button type='submit'>Send</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home