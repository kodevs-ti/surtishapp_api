const express = require('express')
const morgan = require('morgan')

const {
  storesRouters,
  usersRouters,
  authRouters,
  clientsRouters,
  providersRouters,
  categoriesRouters
} = require('./routes')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routes
// app.use('/', usersRouters)
app.use('/stores', storesRouters)
app.use('/auth', authRouters)
app.use('/users', usersRouters)
app.use('/clients', clientsRouters)
app.use('/providers', providersRouters)
app.use('/categories', categoriesRouters)

module.exports = app
