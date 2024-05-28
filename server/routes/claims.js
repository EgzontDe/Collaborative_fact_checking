// server/routes/claims.js

const express = require('express');
const router = express.Router();
const SubmittedClaim = require('../models/SubmittedClaim');

router.post('/submit-claim', async (req, res) => {
    try {
        const { title, claim, content, source, link } = req.body;
        const image = req.file ? req.file.filename : ''; // Use filename instead of path

        const newSubmittedClaim = new SubmittedClaim({
            title,
            claim,
            content,
            source,
            link,
            image
        });

        const savedClaim = await newSubmittedClaim.save();
        res.status(201).json({ message: "Claim submitted successfully", claim: savedClaim });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to submit claim", error: error.message });
    }
});

module.exports = router;
