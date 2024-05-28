// src/components/ClaimsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendUrl from '../config';

const ClaimsList = () => {
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        axios.get(`${backendUrl}/api/claims`)
            .then(response => {
                setClaims(response.data);
            })
            .catch(error => {
                console.error('Error fetching claims:', error);
            });
    }, []);

    return (
        <div>
            <h2>Claims</h2>
            <ul>
                {claims.map(claim => (
                    <li key={claim._id}>{claim.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClaimsList;
