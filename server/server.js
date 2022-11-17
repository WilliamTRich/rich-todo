const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./config/mongoose.config')
app.use(cors())

app.use(express.json(), express.urlencoded({ extended: true }))

const todoRoutes = require('./routes/todo.routes')
todoRoutes(app)

app.listen(8000, () => console.log('Server is ready on port 8000'))