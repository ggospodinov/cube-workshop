const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const privateKey = "CUBE-WORKSHOP-SORTUNI"

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


    const token = jwt.sign({
        userID: userObject._id,
        username: userObject.username
    },
        privateKey)

    res.cookie('aid', token)





    return true;


}
module.exports = {
    saveUser
}