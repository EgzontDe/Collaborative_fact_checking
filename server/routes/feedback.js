// server/routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackdb');
const SubmittedClaim = require('../models/SubmittedClaim');
const analyzeSentiment = require('./SentimentAnalysis'); // Import the sentiment analysis function

// Route for aggregating feedback
router.get('/aggregate-feedback/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const feedbacks = await Feedback.find({ postId });

        // Check if feedbacks are available
        if (feedbacks.length === 0) {
            return res.json({ membership: 0, nonMembership: 0, hesitation: 1 });
        }

        // Initialize accumulators
        let totalMembership = 0, totalNonMembership = 0, totalHesitation = 0;
        feedbacks.forEach(feedback => {
            totalMembership += feedback.membership;
            totalNonMembership += feedback.nonMembership;
            totalHesitation += feedback.hesitation;
        });

        // Calculate average values
        const count = feedbacks.length;
        const avgMembership = totalMembership / count;
        const avgNonMembership = totalNonMembership / count;
        const avgHesitation = totalHesitation / count;

        // Ensure the results are numbers
        const result = {
            membership: isNaN(avgMembership) ? 0 : avgMembership,
            nonMembership: isNaN(avgNonMembership) ? 0 : avgNonMembership,
            hesitation: isNaN(avgHesitation) ? 0 : avgHesitation
        };

        // Logging the aggregate feedback results for debugging
        console.log('Aggregate Feedback for postId:', postId);
        console.log('Membership:', result.membership);
        console.log('Non-Membership:', result.nonMembership);
        console.log('Hesitation:', result.hesitation);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching aggregate feedback", error: error.message });
    }
});

// Route for submitting feedback
router.post('/submit-feedback/:postId', async (req, res) => {
    try {
        const { comment } = req.body.feedback; // Destructure the comment from the request body
        const postId = req.params.postId;

        // Fetch the post to get the source and author
        const post = await SubmittedClaim.findById(postId);
        const source = post.source;
        const author = post.author || ''; // Handle optional author

        const sentimentAnalysis = analyzeSentiment(comment, source, author);

        const newFeedback = new Feedback({
            postId: postId,
            comment: comment,
            sentiment: sentimentAnalysis.sentiment,
            membership: sentimentAnalysis.membership,
            nonMembership: sentimentAnalysis.nonMembership,
            hesitation: sentimentAnalysis.hesitation
        });

        await newFeedback.save();

        // Log the saved feedback
        console.log('Saved Feedback:', newFeedback);

        res.status(200).json({ message: "Feedback submitted successfully", feedback: newFeedback });
    } catch (error) {
        console.error('Request body:', req.body);
        console.error('Error:', error);
        res.status(500).json({ message: "Failed to submit feedback", error: error.message });
    }
});

module.exports = router;
