// InformationBlock.js

import React from 'react';
import './InformationBlock.css'; // Make sure you have the CSS file in the same directory

const InformationBlock = () => {
    // Sample data for 7 fictive users
    const users = [
        { name: 'User 1', score: 84 },
        { name: 'User 2', score: 71 },
        { name: 'User 3', score: 55 },
        { name: 'User 4', score: 48 },
        { name: 'User 5', score: 32 }
    ];

    // Filter out only the top 5 users
    const topUsers = users.slice(0, 5);

    return (
        <div className="info-block">
            <h1>Collaborative Fact Checking platform</h1>
            <p className="subtitle">To train a critical mind, improve the quality of information and decision-making.</p>
            <p className="description">Against fake news, fraud and disinformation</p>
            <p className="additional-info">A copylefted libre online platform, transparent and open to different perspectives. It supports active citizenship and respects your privacy.</p>
            <div className="buttons">
                <button className="btn-discover">Discover Extension</button>
                <button className="btn-signup">Sign up</button>
            </div>
            <div className="footnote">
                <p>FactCo alerts you when you come across false or contested information in a video.</p>
                <p>FactCo is participative: sign up to help verify the information.</p>
            </div>

            {/* Leaderboard */}
            <div className="leaderboard-container">
                <h2>Leaderboard</h2>
                <ol className="leaderboard-list">
                    {topUsers.map((user, index) => (
                        <li key={index} className="leaderboard-item">
                            <span className="leaderboard-rank">#{index + 1}</span>
                            <span className="leaderboard-name">{user.name}</span>
                            <span className="leaderboard-score">{user.score}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default InformationBlock;
