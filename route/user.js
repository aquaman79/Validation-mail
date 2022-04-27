const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const check= require('express-validator')
const signup = require("../control/user")
const signin = require("../control/user")
router
    .post('/signup',
    body("email").isEmail(),
    signup)
router.post('/signin',signin)
module.exports = router