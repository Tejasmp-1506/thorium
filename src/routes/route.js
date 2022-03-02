const express = require('express');
const router = express.Router();

const userModel = require("../models/userModel")

const userController = require("../controllers/usercontroller")


router.post('/createUsers' , Usercontroller.createUser);
router.get('/getData' , Usercontroller.getUsersData);






module.exports = router;