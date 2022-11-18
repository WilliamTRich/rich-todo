const Task = require('../models/tasks.model')

module.exports.createTask = (req, res) => {
    const { task, userId } = req.body
    Task.create({
        userId,
        task
    })
        .then(task => res.json(task))
        .catch(err => res.json(err))
}

module.exports.findTasks = (req, res) => {
    const { userId } = req.body
    Task.find({ userId })
        .then(allTasks => res.json(allTasks))
        .catch(err => res.json(err))
}

module.exports.deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
}
