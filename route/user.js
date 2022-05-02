const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const userControll = require("../control/user")
router
    .post('/signup',
    body("email").isEmail(),
    userControll.signup)
router.post('/signin',userControll.signin)
router.get('/api/:tokenTom',userControll.gets)
module.exports = router