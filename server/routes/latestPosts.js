const express = require('express');
const router = express.Router();
const SubmittedClaim = require('../models/SubmittedClaim');
const Feedback = require('../models/feedbackdb'); // Ensure you have imported Feedback

// Helper function to get aggregated feedback
async function getAggregatedFeedback(postId) {
    const feedbacks = await Feedback.find({ postId });
    if (feedbacks.length === 0) {
        return { membership: 0, nonMembership: 0, hesitation: 1 }; // Defaults when no feedback exists
    }
    const aggregated = feedbacks.reduce((acc, feedback) => {
        acc.membership += feedback.membership;
        acc.nonMembership += feedback.nonMembership;
        acc.hesitation += feedback.hesitation;
        return acc;
    }, { membership: 0, nonMembership: 0, hesitation: 0 });

    const count = feedbacks.length;
    return {
        membership: aggregated.membership / count,
        nonMembership: aggregated.nonMembership / count,
        hesitation: aggregated.hesitation / count
    };
}

router.get('/latest-posts', async (req, res) => {
    try {
        const latestPosts = await SubmittedClaim.find().sort({ createdAt: -1 }).limit(10);
        const postsWithFeedback = await Promise.all(latestPosts.map(async (post) => {
            const feedback = await getAggregatedFeedback(post._id);
            return { ...post._doc, feedback }; // Spread the document and append feedback data
        }));
        res.status(200).json(postsWithFeedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch latest posts", error: error.message });
    }
});

module.exports = router;
