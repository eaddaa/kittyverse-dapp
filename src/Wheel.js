// src/Wheel.js
import React, { useState } from 'react';
import './Wheel.css'; // Çark stil dosyasını ekleyeceğiz

const Wheel = () => {
  const [score, setScore] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const points = [10, 20, 30, 40, 50, 100]; // Puan değerleri

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const randomPoint = points[Math.floor(Math.random() * points.length)];
      setScore(score + randomPoint);
      setTimeout(() => {
        setIsSpinning(false);
      }, 2000); // 2 saniye döndürme süresi
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Your Score: {score}</h2>
      <div className={`wheel ${isSpinning ? 'spin' : ''}`} onClick={spinWheel}>
        <div className="segment">10</div>
        <div className="segment">20</div>
        <div className="segment">30</div>
        <div className="segment">40</div>
        <div className="segment">50</div>
        <div className="segment">100</div>
      </div>
    </div>
  );
};

export default Wheel;
