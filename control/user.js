//model 
const User = require("../modele/user")
var nodemailer = require('nodemailer');

const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")


 const signup = async (req,res)=>{
  console.log("signup")

    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).send({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.tokenTom= jwt.sign({user : user},process.env.SECRET)
    console.log(user.tokenTom)
    const usermail = `http://localhost:3000/api/${user.tokenTom}`
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qquamar1@gmail.com',
        pass: 'fdnojlbzttolsoqe'
      }
    });
    var mailOptions = {
      from: 'qquamar1@gmail.com',
      to: user.email,
      subject: 'Sending Email using Node.js',
      text: `click here ${usermail}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    if(gets==true)
    {
    try{
    await user.save
    }
    catch{
      return res.status(400).send("erreur user modele")
    }
        return res.send({message:"succes "})
  }
}
const gets = async (req,res)=>{
  try{
    var decoded = jwt.verify(req.body, process.env.SECRET); 
    if(decoded==user.tokenTom)
    {
      await module.User.update({confirm:true});
      return true;
    }
  }catch(e){
    res.send("erreur gets") 
  } 
}
 const signin = (req, res) => {
   console.log("sig")
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
      if(err || !user) {
        
        return res.status(400).json({
          error: "Email was not found"
        })
      }
      console.log(user)
      // Authenticate user
      if(!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email and password do not match"
        })
      }
  
      // Create token
      const token = jwt.sign({_id: user._id}, process.env.SECRET)
  
      // Put token in cookie
      res.cookie('token', token, {expire: new Date() + 1})
      // Send response
     const {_id, name, email} = user
      return res.send({
        token,
        user: {
          _id,
          name,
          email
        }
      })
      
    })
  }
module.exports ={signin,signup,gets}
