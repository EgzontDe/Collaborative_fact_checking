// Load environment variables from "nox.env"
require('dotenv').config({ path: './nox.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads
const factCheckRoute = require('./routes/factcheck');
const claimsRoute = require('./routes/claims');
const latestPostsRoute = require('./routes/latestPosts'); // Import the latestPosts route
const addfeedback = require('./routes/feedback');
const sentimentAnalysisRoutes = require('./routes/SentimentAnalysis'); // Adjust the path if necessary

require('./database');

const app = express();
const PORT = process.env.PORT || 3001; // Change to another port if 3000 is in use

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Apply multer middleware to handle file uploads
app.use(upload.single('image'));

// Routes
app.use('/api', factCheckRoute);
app.use('/api/claims', claimsRoute);
app.use('/api', latestPostsRoute); // Mount the latestPosts route
app.use('/api', addfeedback);
app.use('/api/sentiment', sentimentAnalysisRoutes); // Use the sentiment analysis routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
