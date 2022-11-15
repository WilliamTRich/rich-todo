const userController = require('../controllers/todo.controller')

module.exports = app => {
    app.post('/api/register', userController.registerUser)
    app.post('/api/login', userController.loginUser)
    app.get('/api/users', userController.findUsers)
    app.delete('/api/delete/:id', userController.deleteUser)
}

