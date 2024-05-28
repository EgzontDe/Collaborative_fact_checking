const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const axios = require('axios');
const Claim = require('../models/Claim'); // Import the Claim model

const FACT_CHECK_API_KEY = process.env.FACT_CHECK_API_KEY;
const factCheckService = google.factchecktools('v1alpha1');

router.post('/factcheck', async (req, res) => {
    const { claimText } = req.body; // Parse claimText from the request body

    try {
        // Save the claim text in the database
        const newClaim = new Claim({ text: claimText });
        await newClaim.save();

        // Call the Google Fact Check API to verify the claim
        const response = await factCheckService.claims.search({
            key: FACT_CHECK_API_KEY,
            query: claimText,
        });

        // Check if the API response contains any matching claims
        if (response.data.claims && response.data.claims.length > 0) {
            // If a matching claim is found
            const factCheckResult = response.data.claims[0];
            const textualRating = factCheckResult.claimReview[0].textualRating || 'Rating not provided';

            // Save the textual rating in the database
            newClaim.textualRating = textualRating;
            newClaim.verified = true; // Assuming a found claim is verified
            // ... save any other relevant information from the claim ...
            await newClaim.save();

            // Send the result back to the client including the verification status and rating
            res.json({
                result: factCheckResult,
                claimId: newClaim._id,
                verified: newClaim.verified,
                rating: textualRating // Send the textual rating to the frontend
            });
        } else {
            // If no matching claim is found, mark it as false
            newClaim.verified = false; // This should be a boolean, not a string
            newClaim.textualRating = 'No matching claims found.';
            await newClaim.save();

            // Send the result back to the client including the verification status and default rating
            res.json({
                result: 'No matching claims found.',
                claimId: newClaim._id,
                verified: newClaim.verified,
                rating: newClaim.textualRating // Send the default rating message to the frontend
            });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error performing fact-check:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
