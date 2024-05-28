// server/routes/SentimentAnalysis.js

// Example trustworthiness and credibility values
const sourceTrustworthiness = {
    "https://firstcheck.in/": 0.8,
    "https://www.aap.com.au/": 0.8,
    // Add other sources as needed
};

const authorCredibility = {
    "author1": 0.7,
    "author2": 0.6,
    // Add other authors as needed
};

function analyzeSentiment(comment, source, author) {
    const sentimentRules = {
        positive: [
            "excellent", "great", "good", "quite good", "awesome", "amazing", "fantastic",
            "wonderful", "positive", "outstanding", "superb", "marvelous", "exceptional",
            "fabulous", "incredible", "remarkable", "impressive", "perfect", "brilliant",
            "terrific", "splendid", "stunning", "phenomenal", "favorable", "nice", "delightful",
            "satisfying", "fabulous", "commendable", "praiseworthy"
        ],
        negative: [
            "disappointing", "bad", "terrible", "fake", "not true", "awful", "horrible",
            "dreadful", "poor", "negative", "unpleasant", "unfavorable", "inferior", "subpar",
            "substandard", "atrocious", "abysmal", "appalling", "deplorable", "lamentable",
            "wretched", "lousy", "unacceptable", "deficient", "flawed", "unworthy", "unreliable",
            "untrustworthy", "misleading", "deceptive"
        ]
    };

    let positiveCount = 0, negativeCount = 0;
    const words = comment.toLowerCase().split(/\s+/);

    words.forEach(word => {
        if (sentimentRules.positive.includes(word)) {
            positiveCount++;
        } else if (sentimentRules.negative.includes(word)) {
            negativeCount++;
        }
    });

    const totalWords = words.length;
    const membership = totalWords ? positiveCount / totalWords : 0;
    const nonMembership = totalWords ? negativeCount / totalWords : 0;
    const hesitation = 1 - (membership + nonMembership);

    const sourceTrust = sourceTrustworthiness[source] || 0.5; // Default trustworthiness if not found
    const authorCred = authorCredibility[author] || 0.5; // Default credibility if not found

    const combinedTrust = (sourceTrust + authorCred) / 2;

    return {
        sentiment: membership > nonMembership ? 'positive' : nonMembership > membership ? 'negative' : 'neutral',
        membership: membership * combinedTrust,
        nonMembership: nonMembership * combinedTrust,
        hesitation: hesitation * combinedTrust
    };
}

module.exports = analyzeSentiment;
