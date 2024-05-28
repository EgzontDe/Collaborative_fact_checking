// server/routes/factSubmissions.js

const express = require('express');
const router = express.Router();
const Fact = require('../models/Fact'); // You'll need to create a Fact model

router.post('/submit-fact', async (req, res) => {
    const { claimId, fact, source } = req.body;

    const newFact = new Fact({
        claimId,
        fact,
        source,
        createdAt: new Date()
    });

    try {
        await newFact.save();
        res.status(201).send(newFact);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
