const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    sentiment: { type: String, required: true },
    membership: { type: Number, default: 0 }, // Calculated later
    nonMembership: { type: Number, default: 0 }, // Calculated later
    hesitation: { type: Number, default: 0 } // Calculated later
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
