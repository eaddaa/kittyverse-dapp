import React, { useState } from 'react';
import './Wheel.css'; // CSS dosyasını unutma

const Wheel = () => {
  const [prize, setPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Çarkı rastgele bir açı ile döndür
    const deg = Math.floor(5000 + Math.random() * 5000);
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;

    setTimeout(() => {
      const sectors = [0, 10, 20, 30, 40, 60, 100]; // Dilimler
      const chosenSector = sectors[Math.floor(Math.random() * sectors.length)];
      setPrize(chosenSector);
      setIsSpinning(false);
    }, 5000); // 5 saniyelik dönüş süresi
  };

  return (
    <div className="wheel-container">
      <div id="wheel" className="wheel">
        <div className="sector">100</div>
        <div className="sector">60</div>
        <div className="sector">40</div>
        <div className="sector">30</div>
        <div className="sector">20</div>
        <div className="sector">10</div>
        <div className="sector">0</div>
      </div>
      <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {prize !== null && <div className="prize-display">Your Prize: {prize} KITTY</div>}
    </div>
  );
};

export default Wheel;
