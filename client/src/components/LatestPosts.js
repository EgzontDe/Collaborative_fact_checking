import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LatestPosts.css';

const LatestPosts = () => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [fuzzyResults, setFuzzyResults] = useState({});  // Initialize fuzzyResults state

    const users = useMemo(() => Array.from({ length: 10 }, (v, i) => ({
        id: `user${i}`,
        name: `User ${i}`
    })), []);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            const response = await fetch('/api/latest-posts');
            if (response.ok) {
                const data = await response.json();
                setLatestPosts(data);
                const initialFeedbacks = {};
                const initialUsers = {};
                data.forEach(post => {
                    initialFeedbacks[post._id] = '';
                    initialUsers[post._id] = users[0].id;  // default to first user
                    fetchAggregateFeedback(post._id);
                });
                setFeedbacks(initialFeedbacks);
                setSelectedUser(initialUsers);
            }
        };

        fetchLatestPosts();
    }, [users]);

    const fetchAggregateFeedback = async (postId) => {
        const response = await fetch(`/api/aggregate-feedback/${postId}`);
        if (response.ok) {
            const result = await response.json();
            setFuzzyResults(prev => ({
                ...prev,
                [postId]: result
            }));
        }
    };

    const handleFeedbackSubmit = async (postId) => {
        const feedbackComment = feedbacks[postId];
        try {
            const response = await fetch(`/api/submit-feedback/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback: { comment: feedbackComment } }) // Only comment is submitted
            });
            if (response.ok) {
                await fetchAggregateFeedback(postId);  // Update sentiment analysis result
                setFeedbacks(prev => ({ ...prev, [postId]: '' })); // Clear the feedback input after submission
                toast.success('Feedback submitted successfully');
            } else {
                toast.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Error submitting feedback');
        }
    };

    const interpretResult = (result) => {
        if (!result) return "Pending";
        const { membership, nonMembership } = result;
        console.log('Result:', result); // Add log to check the result values
        if (membership > 0.6) return "True";
        if (membership > 0.4) return "Mostly True";
        if (nonMembership > 0.6) return "False";
        if (nonMembership > 0.4) return "Mostly False";
        return "Pending";
    };

    return (
        <div className="latest-posts-container">
            <h2>Latest Posts</h2>
            <div className="post-container">
                {latestPosts.map(post => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p className="post-details">
                            Submitted by: {post.source} | {post.author ? `Posted by: ${post.author} |` : ''} Posted on: {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <div className="feedback-form">
                            <input
                                type="text"
                                placeholder="Enter your feedback"
                                value={feedbacks[post._id] || ''}
                                onChange={e => setFeedbacks({ ...feedbacks, [post._id]: e.target.value })}
                            />
                            <button onClick={() => handleFeedbackSubmit(post._id)}>Submit Feedback</button>
                            <p className="fuzzy-result">Result: {interpretResult(fuzzyResults[post._id])}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default LatestPosts;
