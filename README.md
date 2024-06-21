# Fact Checking Using Fuzzy Intuitionistic Systems

This project implements a dual-approach fact-checking system using fuzzy logic to evaluate new claims based on user feedback and source reliability, and Quick Fact Checking via Google API for claims that have already been verified.

## Overview

The system allows users to view posts, submit feedback, and see a dynamically updated credibility score based on fuzzy logic calculations. Additionally, it integrates with the Google Fact Check API to pull in data on claims that have been previously verified. This allows the system to provide immediate feedback on well-known facts while still leveraging user input for newer or less clear claims.

## Features

- **List latest posts**: Users can view the latest claims that need verification or have been previously checked.
- **Submit feedback**: Users can provide feedback on new claims.
- **Fuzzy logic analysis**: The system calculates a credibility score for new claims based on feedback and source reliability.
- **Quick Fact Checking**: Automatically checks claims against the Google Fact Check API for verified information.
- **Dynamic updates**: Both fuzzy logic scores and verified facts update dynamically in the user interface.

## Technologies Used

- **Frontend**: React, React Toastify for notifications
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **API Integration**: Google Fact Check API
- **State Management**: React Hooks
- **Styling**: CSS

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourgithubusername/fact-checking-using-fuzzy-logic.git
   cd fact-checking-using-fuzzy-logic
