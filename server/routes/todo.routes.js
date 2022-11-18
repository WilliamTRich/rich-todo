//Controllers
const userController = require('../controllers/users.controller')
const taskController = require('../controllers/tasks.controller')

module.exports = app => {
    //Users
    app.post('/api/register', userController.registerUser)
    app.post('/api/login', userController.loginUser)
    app.post('/api/user', userController.findUser)
    app.get('/api/users', userController.findUsers)
    app.delete('/api/delete/:id', userController.deleteUser)

    //Tasks
    app.post('/api/create', taskController.createTask)
    app.post('/api/gettasks', taskController.findTasks)
    app.delete('/api/task/delete/:id', taskController.deleteTask)
}
