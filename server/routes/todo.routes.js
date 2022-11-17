const jwt = require('jsonwebtoken')
require('dotenv').config()
const userController = require('../controllers/users.controller')

module.exports = app => {
    app.post('/api/register', userController.registerUser)
    app.post('/api/login', userController.loginUser)
    app.get('/api/users', userController.findUsers)
    app.delete('/api/delete/:id', userController.deleteUser)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.status(400).json({ errors: [{ message: 'Null status' }] })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ errors: [{ message: "You don't have access to this page." }] })
        req.user = user
        next()
    })
}