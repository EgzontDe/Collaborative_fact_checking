// server/models/Claim.js
const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
    verified: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['True', 'False', 'Misleading'], default: 'False' },
    textualRating: { type: String, default: 'Rating not provided' }, // New field for textual rating
    createdAt: { type: Date, default: Date.now }
});

const Claim = mongoose.model('Claim', claimSchema);
module.exports = Claim;
