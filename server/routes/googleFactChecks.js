// server/routes/googleFactChecks.js

const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
require('dotenv').config({ path: './nox.env' });

const FACT_CHECK_API_KEY = process.env.FACT_CHECK_API_KEY;
const factCheckService = google.factchecktools({ version: 'v1alpha1', auth: FACT_CHECK_API_KEY });

// Define a list of queries to select from randomly, or specific queries as needed
const queries = ['vaccine', 'climate change', 'economy', 'health']; // Example queries

// Endpoint to fetch detailed recent fact checks
router.get('/recent', async (req, res) => {
    // Use a random query from your list, or a specific query
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    try {
        const response = await factCheckService.claims.search({
            query: randomQuery, // Optional: replace with a specific query
            languageCode: 'en', // Restrict results to English
            maxAgeDays: 30,    // Optional: Fetch claims not older than 30 days
            pageSize: 10       // Optional: Specify the number of results to return
            // Include other parameters as needed
        });

        const detailedClaims = response.data.claims.map(claim => {
            // Extract the first review if it exists
            const firstReview = claim.claimReview?.[0] || {};
            return {
                text: claim.text || 'No text available',
                claimant: claim.claimant || 'Anonymous',
                claimDate: claim.claimDate || 'Unknown date',
                textualRating: firstReview.textualRating || 'No rating provided',
                review: {
                    url: firstReview.url || '',
                    title: firstReview.title || 'No title available',
                    reviewDate: firstReview.reviewDate || 'Unknown review date',
                    publisher: firstReview.publisher?.name || 'No publisher',
                    publisherSite: firstReview.publisher?.site || 'No publisher site',
                    imageUrl: firstReview.publisher?.image || 'default-thumbnail.png' // Use a default thumbnail if not provided
                },
                languageCode: firstReview.languageCode || 'en'
            };
        });

        res.json(detailedClaims);
    } catch (error) {
        console.error('Error fetching detailed recent fact checks:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router; // Export the router for use in your server.js or app.js file
