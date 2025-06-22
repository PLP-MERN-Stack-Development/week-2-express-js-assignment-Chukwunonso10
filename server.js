// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');


//const { v4: uuidv4 } = require('uuid');
const productRoute = require('./Routes/productRoute');
require('dotenv').config()
const logger = require('./logger')
const auth = require('./auth')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))



app.use(logger)
//mount our productRoute
app.use('/api', productRoute)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
//module.exports = app; 