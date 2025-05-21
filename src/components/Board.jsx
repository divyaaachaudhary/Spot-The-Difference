import React, { useEffect, useState, useRef } from 'react';
import Win from './win.jsx';
import '../App.css';

const GameBoard = () => {
    const [gameData, setGameData] = useState(null);
    const [found, setFound] = useState([]);
    const [wrongClicks, setWrongClicks] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [endTime, setEndTime] = useState(null);
    const [timer, setTimer] = useState(0);
    const [level, setLevel] = useState(1);

    const correctSound = useRef(new Audio('/sounds/correct.mp3'));
    const wrongSound = useRef(new Audio('/sounds/wrong.mp3'));

    useEffect(() => {
        fetch(`/difference${level}.json`)
            .then(res => res.json())
            .then(data => {
                setGameData(data);
                setStartTime(Date.now());
            })
            .catch(err => console.error('Error loading JSON:', err));
    }, [level]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!endTime) {
                setTimer(Math.floor((Date.now() - startTime) / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime, startTime]);

    const handleClick = (e) => {
        if (!gameData) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        const match = gameData.differences.find((diff, idx) => {
            return (
                x >= diff.x &&
                x <= diff.x + diff.width &&
                y >= diff.y &&
                y <= diff.y + diff.height &&
                !found.includes(idx)
            );
        });

        if (match) {
            correctSound.current.play();
            const idx = gameData.differences.indexOf(match);
            setFound([...found, idx]);

            if (found.length + 1 === gameData.differences.length) {
                setEndTime(Date.now());
            }
        } else {
            wrongSound.current.play();
            setWrongClicks([...wrongClicks, { x, y }]);
        }
    };

    const handleRetry = () => {
        setFound([]);
        setWrongClicks([]);
        setEndTime(null);
        setStartTime(Date.now());
    };

    const handleNext = () => {
        setFound([]);
        setWrongClicks([]);
        setEndTime(null);
        setStartTime(Date.now());
        setLevel(prev => prev + 1);
    };

    if (!gameData) return <p>Loading...</p>;

    const { images, differences, gameTitle } = gameData;

    if (endTime) {
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        return <Win timeTaken={timeTaken} onRetry={handleRetry} onNext={handleNext} />;
    }

    return (
        <div className="game-container">
            <div className="game-header">
                <h1>{gameTitle}</h1>
                <p>{timer} sec</p>
            </div>

            <div className="image-row">
                {[images.image1, images.image2].map((src, i) => (
                    <div className="image-wrapper" key={i}>
                        <img
                            src={src}
                            alt={`img-${i}`}
                            onClick={handleClick}
                            className="game-image"
                        />

                        {found.map((id) => {
                            const diff = differences[id];
                            const centerX = diff.x + diff.width / 2;
                            const centerY = diff.y + diff.height / 2;
                            const radius = Math.min(diff.width, diff.height) / 2;

                            return (
                                <div
                                    key={`correct-${id}`}
                                    className="correct-circle"
                                    style={{
                                        left: centerX - radius,
                                        top: centerY - radius,
                                        width: radius * 2,
                                        height: radius * 2
                                    }}
                                ></div>
                            );
                        })}

                        {wrongClicks.map((click, index) => (
                            <div
                                key={`wrong-${index}`}
                                className="wrong-circle"
                                style={{
                                    left: click.x - 10,
                                    top: click.y - 10
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="footer">
                <p>{found.length} / {differences.length} found</p>
                <button onClick={handleRetry}>Retry</button>
            </div>
        </div>
    );
};

export default GameBoard;
