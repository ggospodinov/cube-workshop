const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const privateKey = "CUBE-WORKSHOP-SORTUNI"


const generateToken = data => {
    const token = jwt.sign(data, privateKey)
  
    return token
  }

const saveUser = async (req, res) => {

    const {
        username,
        password
    } = req.body


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashPassword

    })
    const userObject = await user.save();


    const token = generateToken({
        userID: userObject._id,
        username: userObject.username
    })
        

    res.cookie('aid', token)

   return true;

}

const verifyUser = async (req, res) => {
    const {
      username,
      password
    } = req.body
  
    const user = await User.findOne({ username })
    const status = await bcrypt.compare(password, user.password)
  
     if (status) {
       const token = generateToken({ 
         userID: user._id,
         username: user.username
       })
     
      res.cookie('aid', token)
     }
  
    return status
  }




module.exports = {
    saveUser,
    verifyUser
}