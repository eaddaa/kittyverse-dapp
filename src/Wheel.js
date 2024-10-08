import React, { useState } from 'react';
import './Wheel.css'; // CSS dosyasını unutma
import audioFile from './sounds/spin-sound.mp3'; // Müzik dosyasını src dizininden import et

const Wheel = () => {
  const [prize, setPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [audio] = useState(new Audio(audioFile)); // Müzik dosyasını yükle

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    audio.play(); // Müzik çalmaya başla

    // Çarkı rastgele bir açı ile döndür
    const deg = Math.floor(5000 + Math.random() * 5000);
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;

    setTimeout(() => {
      const sectors = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Dilimler
      const chosenSector = sectors[Math.floor(Math.random() * sectors.length)];
      setPrize(chosenSector);
      setIsSpinning(false);
    }, 5000); // 5 saniyelik dönüş süresi
  };

  const claimPrize = () => {
    if (prize !== null) {
      // Burada kazançları cüzdana ekleme işlemi simüle ediliyor
      alert(`You have successfully claimed ${prize} KITTY!`); // Kullanıcıya bildirim
      // Kazancı sıfırlayın
      setPrize(null); 
    } else {
      alert('No prize to claim!'); // Talep edilecek bir ödül yoksa uyarı
    }
  };

  return (
    <div className="wheel-container">
      <div className="intro-text">Welcome to Kittverse!</div> {/* Giriş yazısı */}
      <div id="wheel" className="wheel">
        <div className="sector" style={{ backgroundColor: '#FFDD57' }}></div>
        <div className="sector" style={{ backgroundColor: '#FF6B6B' }}></div>
        <div className="sector" style={{ backgroundColor: '#6BCB77' }}></div>
        <div className="sector" style={{ backgroundColor: '#4D96FF' }}></div>
        <div className="sector" style={{ backgroundColor: '#FFC107' }}></div>
        <div className="sector" style={{ backgroundColor: '#FD7E14' }}></div>
        <div className="sector" style={{ backgroundColor: '#20C997' }}></div>
        <div className="sector" style={{ backgroundColor: '#17A2B8' }}></div>
        <div className="sector" style={{ backgroundColor: '#6610f2' }}></div>
        <div className="sector" style={{ backgroundColor: '#e83e8c' }}></div>
      </div>
      <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {prize !== null && (
        <div className="prize-display">
          Your Prize: {prize} KITTY 
          <button onClick={claimPrize} className="claim-button">Claim</button> {/* Claim butonu */}
        </div>
      )}
      <div className="controls">
        <button onClick={() => audio.pause()} className="music-button">Stop Music</button> {/* Müzik durdurma butonu */}
        <button onClick={() => audio.play()} className="music-button">Play Music</button> {/* Müzik oynatma butonu */}
      </div>
    </div>
  );
};

export default Wheel;



