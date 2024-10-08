import React, { useState } from 'react';
import './Wheel.css'; // CSS dosyasını unutma
import audioFile from './sounds/spin-sound.mp3'; // Müzik dosyasını src dizininden import et

const Wheel = () => {
  const [prize, setPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const audio = new Audio(audioFile); // Müzik dosyasını yükle

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    audio.play(); // Müzik çalmaya başla

    // Çarkı rastgele bir açı ile döndür
    const deg = Math.floor(5000 + Math.random() * 5000);
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`; // Dönüş açısını uygulama

    setTimeout(() => {
      const sectors = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Dilimler
      const chosenSector = sectors[Math.floor(Math.random() * sectors.length)];
      setPrize(chosenSector);
      setIsSpinning(false);
    }, 5000); // 5 saniyelik dönüş süresi
  };

  return (
    <div className="wheel-container">
      <div id="wheel" className="wheel">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="sector" style={{ backgroundColor: `hsl(${i * 36}, 100%, 50%)` }}>
            {i * 10 + 10}
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {prize !== null && (
        <div className="prize-display">
          Your Prize: {prize} KITTY
        </div>
      )}
      <div className="controls">
        <button onClick={() => audio.pause()}>Stop Music</button> {/* Müzik durdurma butonu */}
        <button onClick={() => audio.play()}>Play Music</button> {/* Müzik oynatma butonu */}
      </div>
    </div>
  );
};

export default Wheel;

