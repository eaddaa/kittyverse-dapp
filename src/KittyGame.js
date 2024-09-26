import React, { useState } from 'react';

const KittyGame = () => {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const startGame = () => {
    setScore(0);
    setIsGameActive(true);
    setTimeout(() => {
      setIsGameActive(false);
      alert(`Game Over! Your Score: ${score}`);
    }, 60000); // 60 seconds
  };

  const collectKitty = () => {
    if (isGameActive) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      <h1>Kitty Collecting Game</h1>
      <p>Score: {score}</p>
      <button onClick={startGame}>Start Game</button>
      {isGameActive && (
        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              onClick={collectKitty}
              style={{
                position: 'absolute',
                top: `${Math.random() * 350}px`,
                left: `${Math.random() * 90}%`,
                cursor: 'pointer',
                width: '50px',
                height: '50px',
                backgroundColor: 'pink',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KittyGame;
