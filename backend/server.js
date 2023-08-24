const mongoose = require('mongoose');
require('dotenv').config();
const { app } = require('./app');

MONGO_URL = process.env.DB_URL

// Establish connection to MongoDB Atlas
mongoose.connect(MONGO_URL);

mongoose.connection.once('open', () => {
  console.log('Connection succesful');
});

// Spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
