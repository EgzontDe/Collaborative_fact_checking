import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ContentDivider from './components/ContentDivider';
import ClaimForm from './components/ClaimForm';
import SubmitClaim from "./components/submitClaim";
import LatestNews from "./components/LatestPosts";
import InformationBlock from "./components/InformationBlock"
import Footer from "./components/Footer"

function App() {
    // Define the left and right content for the ContentDivider
    const rightContent = <ClaimForm />;
    const leftContent = <InformationBlock />;

    return (
        <Router>
            <div>
                <Header />
                <ContentDivider rightContent={rightContent} leftContent={leftContent}/>
                <SubmitClaim/>
                <LatestNews />
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
