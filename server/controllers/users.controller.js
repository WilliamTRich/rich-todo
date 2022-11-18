const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.registerUser = async (req, res) => {
    const { userName, password, cPassword } = req.body

    try {
        const userExist = await User.findOne({ userName })
        if (userExist) {
            return res
                .status(400)
                .json({ errors: [{ message: 'Username already in use.' }] })
        } else {
            User.create({
                userName,
                password,
                cPassword
            })
                .then(user => res.json(user))
                .catch(err => res.status(400).json(err))
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.loginUser = async (req, res) => {
    const { userName, password } = req.body

    try {
        const userExist = await User.findOne({ userName })
        if (userExist) {
            if (await bcrypt.compare(password, userExist.password)) {
                const user = { userId: userExist._id }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                return res.json({ accessToken })
            } else {
                return res
                    .status(400)
                    .json({ errors: [{ message: 'Password is invalid.' }] })
            }
        } else {
            return res
                .status(400)
                .json({ errors: [{ message: 'Username does not exist.' }] })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.findUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
}

module.exports.findUser = (req, res) => {
    const { userName } = req.body
    User.findOne({ userName })
        .then(user => res.json(user))
        .catch(err => console.log(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
}