import React, { useState } from 'react';
import './submitClaim.css'; // Import the CSS file

const ClaimSubmissionForm = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        title: '',
        claim: '',
        content: '',
        source: '',
        link: '',
        image: null,
        author: '', // Author field
    });

    // State to hold the submission status message
    const [submissionMessage, setSubmissionMessage] = useState('');

    // Function to handle changes in form fields including file upload
    const handleChange = (event) => {
        const { name, type, value, files } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send the form data to the backend for processing
            const response = await fetch('/api/claims/submit-claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Clear the form after successful submission
                setFormData({
                    title: '',
                    claim: '',
                    content: '',
                    source: '',
                    link: '',
                    image: null,
                    author: '', // Clear author field
                });
                setSubmissionMessage('Claim submitted successfully');
            } else {
                const data = await response.json();
                setSubmissionMessage(data.message || 'Failed to submit claim');
            }
        } catch (error) {
            console.error('Error submitting claim:', error);
            setSubmissionMessage('Failed to submit claim');
        }
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <h2>Submit Your Claim</h2>
                {submissionMessage && <p className={submissionMessage.includes('successfully') ? 'success' : 'error'}>{submissionMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="claim">Claim:</label>
                        <textarea
                            id="claim"
                            name="claim"
                            value={formData.claim}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="source">Source:</label>
                        <input
                            type="text"
                            id="source"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Author (optional):</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ClaimSubmissionForm;
