const mongoose = require('mongoose');

const submittedClaimSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is required'],
    },
    claim: {
        type: String,
        required: [true, 'A claim is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    source: {
        type: String,
        required: [true, 'A source is required'],
    },
    link: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: [true, 'A link is required']
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: false, // Make author optional
    },
});

const SubmittedClaim = mongoose.model('SubmittedClaim', submittedClaimSchema);

module.exports = SubmittedClaim;
