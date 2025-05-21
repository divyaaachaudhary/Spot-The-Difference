import React from 'react';
import './win.css';

const Win = ({ timeTaken, onRetry, onNext }) => {
    return (
        <div className="win-screen">
            <h1>🎉 You Won!</h1>
            <p>Time Taken: {timeTaken} seconds</p>
            <button onClick={onRetry}>🔁 Retry</button>
            <button onClick={onNext}>➡️ Next Level</button>
        </div>
    );
};

export default Win;
