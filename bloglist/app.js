
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const path = require('path')


const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const testingRouter = require('./controllers/testing')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/testing', testingRouter)

app.use(express.static(path.join(__dirname, 'dist')))

app.use((req, res, next) => {
   
    if (req.path.startsWith('/api')) {
        return next()
    }

    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})



module.exports = app