const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackdb');
const SubmittedClaim = require('../models/SubmittedClaim');

const calculateFuzzyValues = async (claim) => {
    let mu = 0.5; // Initial guess of truth
    let nu = 0.5; // Initial guess of falsity

    if (claim.source === 'https://www.aap.com.au/') {
        mu += 0.2;
    }

    const feedbacks = await Feedback.find({ postId: claim._id });
    feedbacks.forEach(feedback => {
        if (feedback.sentiment === 'positive') {
            mu += 0.05;
            nu -= 0.05;
        } else if (feedback.sentiment === 'negative') {
            mu -= 0.05;
            nu += 0.05;
        }
    });

    mu = Math.min(Math.max(mu, 0), 1);
    nu = Math.min(Math.max(nu, 0), 1);
    const pi = 1 - mu - nu;

    return { mu, nu, pi };
};

const determineFuzzyCategory = ({ mu, nu, pi }) => {
    if (mu > 0.8) return "True";
    if (mu > 0.6) return "Mostly True";
    if (nu > 0.8) return "False";
    if (nu > 0.6) return "Mostly False";
    if (pi > 0.5) return "Out of Context";
    return "Neutral";
};

router.post('/submit-feedback/:postId', async (req, res) => {
    const { feedback } = req.body;
    try {
        const claim = await SubmittedClaim.findById(req.params.postId);
        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }

        // Save feedback here, depending on your schema
        const newFeedback = new Feedback({
            ...feedback,
            postId: claim._id
        });
        await newFeedback.save();

        const fuzzyValues = await calculateFuzzyValues(claim);
        console.log("Fuzzy Values:", fuzzyValues);

        const category = determineFuzzyCategory(fuzzyValues);
        console.log("Determined Category:", category);

        res.status(200).json({ message: "Feedback submitted and claim updated", category });
    } catch (error) {
        console.error('Error updating claim:', error);
        res.status(500).json({ message: "Failed to update claim", error: error.message });
    }
});

module.exports = router;
