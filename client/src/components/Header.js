import React from 'react';
import './Header.css'; // Make sure to create a CSS file with this name

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-brand">FactCo</div>
            <nav className="nav-menu">
                <a href="/" className="nav-item">Home</a>
                <a href="/fact-checked" className="nav-item">Fact Checked</a>
                <a href="/newsletter" className="nav-item">Newsletter</a>
                <a href="/become-a-fact-checker" className="nav-item">Become A Fact Checker</a>
            </nav>
            <div className="search-container">
                <input type="text" placeholder="Search.." className="search-input"/>
                <button type="submit" className="search-btn">🔍</button>
            </div>
        </header>
    );
};

export default Navbar;
