// server/database.js
const mongoose = require('mongoose');

// Check for MongoDB URI in environment variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fact_check';

// Connect to MongoDB without deprecated options
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB at', mongoURI))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
