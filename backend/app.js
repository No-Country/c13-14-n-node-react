const path = require('path');
const fs = require('fs');

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');


// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller')

// Routers
const { usersRouter } = require('./routes/users.routes');
const { linksRouter } = require('./routes/links.routes');
const { profileRouter } = require('./routes/profile.routes');
const { themeRouter } = require('./routes/theme.routes');
const { userProfileRouter } = require('./routes/userProfileRouter.routes');
const fileUpload = require('express-fileupload');
const { APP_IMAGE_FOLDER } = require('./config/constants');

// Init express app
const app = express();

console.log(APP_IMAGE_FOLDER, !fs.existsSync(APP_IMAGE_FOLDER))
// Creo la carpeta si no existe
if (!fs.existsSync(APP_IMAGE_FOLDER))  fs.mkdirSync(APP_IMAGE_FOLDER)
app.use(fileUpload());

// Development Mode
if (process.env.DEV) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Enable CORS
app.use(cors());

// Development Mode
if (process.env.DEV) {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

app.use('/api/v1/uploads/images', express.static('uploads/images'))

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/links', linksRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/theme', themeRouter);
app.use('/api/v1/userprofile', userProfileRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
