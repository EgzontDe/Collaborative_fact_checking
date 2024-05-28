import React from 'react';
import './ContentDivider.css'; // Make sure to create a corresponding CSS file

const ContentDivider = ({ leftContent, rightContent }) => {
    return (
        <div className="content-divider">
            <div className="left-content">
                {leftContent}
            </div>
            <div className="right-content">
                {rightContent}
            </div>
        </div>
    );
};

export default ContentDivider;
