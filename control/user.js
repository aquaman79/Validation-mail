//model 
const User = require("../modele/user")
const {validationResult} = require('express-validator')


 const signup = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).send({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    console.log(user)
    user.save((err)=>{
        if(err)
            return res.status(400).send("erreur user modele")
        return res.send({message:"succes "})
    })
}
 const signin = (req, res) => {
    const {email, password} = req.body
  
    User.findOne({email}, (err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error: "Email was not found"
        })
      }
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
      return res.json({
        token,
        user: {
          _id,
          name,
          email
        }
      })
      
    })
  }

module.exports=signup
module.exports=signin