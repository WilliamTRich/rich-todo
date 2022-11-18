const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    task: {
        type: String,
    }
}, { collection: 'tasks' })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task