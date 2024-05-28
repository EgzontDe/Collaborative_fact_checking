import React, { useState } from 'react';
import axios from 'axios';
import './ClaimForm.css'; // Ensure your CSS file is in the same directory

const ClaimForm = () => {
    const [claimText, setClaimText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        try {
            const response = await axios.post('/api/factcheck', { claimText });
            setResult(response.data.result);
            setRating(response.data.rating);
            setError('');
        } catch (error) {
            console.error('Error submitting claim:', error);
            setError('Failed to submit claim. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const renderRatingImage = () => {
        if (rating === 'True') {
            const trueImage = require('./True.png');
            return <img src={trueImage} alt="True Rating" className="rating-image" />;
        } else if (rating === 'False') {
            const falseImage = require('./False.png');
            return <img src={falseImage} alt="False Rating" className="rating-image" />;
        } else {
            return null; // No matching claims found, so no image
        }
    };

    return (
        <div className="claim-form">
            <h2>Check a Claim</h2>
            {error && <p className="error">{error}</p>}
            {result && (
                <div>
                    <p className="result-info">This claim was found in the FactCo Database.</p>
                    <p className={`rating ${rating.toLowerCase()}`}>Rating: {rating}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="claimText">Claim Text:</label>
                    <textarea
                        id="claimText"
                        value={claimText}
                        onChange={(e) => setClaimText(e.target.value)}
                        required
                        disabled={isLoading} // Disable textarea while loading
                    />
                </div>
                {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
                {renderRatingImage()}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ClaimForm;
