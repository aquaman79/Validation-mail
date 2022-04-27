const mongoose = require('mongoose')
const express = require('express')
const app =express()

const bodyparser =require('body-parser')
require("dotenv").config();

mongoose.connect(process.env.DATABASE)

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//import router 
 const userRoutes = require("./route/user")

//using route 

 app.use('/api',userRoutes)

// port 
 const port = process.env.PORT|| 3000

app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})