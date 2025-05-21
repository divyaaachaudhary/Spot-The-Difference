
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src="/assets/home.png" alt="Level 1" />

            <h1>Find the Difference</h1>
            <button onClick={() => navigate('/game')}>Play Game ▶</button>
        </div>
    );
};

export default Home;
