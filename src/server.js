const express = require('express')
const morgan = require('morgan')

const { usersRouters, authRouters } = require('./routes')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routes
// app.use('/', usersRouters)
app.use('/auth', authRouters)
app.use('/users', usersRouters)

module.exports = app
