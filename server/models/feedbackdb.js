// server/models/feedbackdb.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    sentiment: { type: String },  // e.g., 'positive', 'negative', 'neutral'
    membership: { type: Number, required: true },  // Degree to which the comment is positive
    nonMembership: { type: Number, required: true }, // Degree to which the comment is negative
    hesitation: { type: Number, required: true }  // Degree of uncertainty
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
