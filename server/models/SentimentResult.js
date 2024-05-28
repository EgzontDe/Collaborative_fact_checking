const mongoose = require('mongoose');

const SentimentResultSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    positiveCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 },
    neutralCount: { type: Number, default: 0 },
    // Other fields as needed
});

const SentimentResult = mongoose.model('SentimentResult', SentimentResultSchema);

module.exports = SentimentResult;
