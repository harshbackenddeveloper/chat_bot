const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller");


router.get('/register', userController.user);
router.get('/getAllMessages', userController.getAllMessages);
router.get('/addMessage', userController.addMessages);



// router.post('/api/send-message', userController.sendMessage );



module.exports = router;