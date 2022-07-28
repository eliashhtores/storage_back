require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require("cors")
const winston = require('winston')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const filesRouter = require('./routes/files')

const app = express()

const logConfiguration = {
  'transports': [
    new winston.transports.File({
      filename: 'logs/example.log'
    })
  ]
}

const winstonLogger = winston.createLogger(logConfiguration)

if (process.env.ENV === 'development') {
  // Log a message
  winstonLogger.log({
    // Message to be logged
    message: `Process started at ${new Date()}`,

    // Level of the message logging
    level: 'info'
  })
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/files', filesRouter)
app.listen(process.env.PORT || 3002, () => console.log(`Server running on port ${process.env.PORT}`))

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  winstonLogger.error(err.message)

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})
