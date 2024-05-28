// Footer.js

import React from 'react';
import './Footer.css'; // Make sure you have the CSS file in the same directory

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 FactCo. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="http://localhost:3001/">Privacy Policy</a></li>
                    <li><a href="http://localhost:3001/">Terms of Service</a></li>
                    <li><a href="http://localhost:3001/">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
