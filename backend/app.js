const https = require('https')
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller')

// Routers
const { usersRouter } = require('./routes/users.routes')
const { linksRouter } = require('./routes/links.routes')
const { profileRouter } = require('./routes/profile.routes')
const { themeRouter } = require('./routes/theme.routes')
const { userProfileRouter } = require('./routes/userProfileRouter.routes')
// Init express app
const app = express()

// Development Mode
if (process.env.DEV) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Enable CORS
app.use(cors())

// Development Mode
if (process.env.DEV) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Enable incoming JSON data
app.use(express.json())

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP'
})

app.use(limiter)

// Endpoints
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/links', linksRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/theme', themeRouter)
app.use('/api/v1/userprofile', userProfileRouter)

// Global error handler
app.use('*', globalErrorHandler)

module.exports = { app }
