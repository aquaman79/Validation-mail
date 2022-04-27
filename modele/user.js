const mongoose = require("mongoose")
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

const userSchema = mongoose.Schema({
    name : String, 
    email :{type:String, require : true},
    encry_password:{type:String, require : true}, 
    salt :String  
})
userSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function() {
    return this._password
  })
  userSchema.methods = {
    authenticate: function(plainpassword) {
      return this.securePassword(plainpassword) === this.encry_password
    },
  
    securePassword: function(plainpassword) {
      if(!plainpassword) return "";
  
      try {
        return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
      } catch (err) {
        return ""
      }
    }
  }
const User = mongoose.model("User",userSchema)

module.exports = User