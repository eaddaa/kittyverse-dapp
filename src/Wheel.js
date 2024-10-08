import React, { useState, useEffect } from 'react';
import './Wheel.css'; // CSS dosyasını unutma
import audioFile from './sounds/spin-sound.mp3'; // Müzik dosyasını src dizininden import et
import { ethers } from 'ethers';

const Wheel = () => {
  const [prize, setPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const kittyTokenAddress = "0x0fd8a8af456b09c85bd63c65308e47c10da756a1"; // KITTY token kontrat adresi
  const kittyDecimals = 18; // KITTY token'ın ondalık sayısı
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

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserWalletAddress(accounts[0]);
        console.log(`Connected wallet: ${accounts[0]}`);
      } catch (error) {
        console.error('User rejected the request:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  };

  const claimPrize = async () => {
    if (!userWalletAddress || prize === null) {
      alert('Please connect your wallet and spin the wheel first!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const kittyContract = new ethers.Contract(kittyTokenAddress, [
      "function transfer(address recipient, uint256 amount) public returns (bool)"
    ], signer);

    try {
      const amountToTransfer = ethers.utils.parseUnits(prize.toString(), kittyDecimals);
      const tx = await kittyContract.transfer(userWalletAddress, amountToTransfer);
      await tx.wait(); // İşlemin tamamlanmasını bekle
      alert(`Claim successful! ${prize} KITTY sent to your wallet.`);
      setPrize(null); // Ödül talep edildikten sonra sıfırla
    } catch (error) {
      console.error("Claim failed:", error);
      alert('Claim failed. Please try again.');
    }
  };

  return (
    <div className="wheel-container">
      <div className="intro-text">Welcome to Kittverse!</div> {/* Giriş yazısı */}
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
      <button onClick={connectWallet} className="connect-button">
        Connect Wallet
      </button>
      {prize !== null && (
        <div className="prize-display">
          Your Prize: {prize} KITTY 
          <button onClick={claimPrize} className="claim-button">Claim</button> {/* Claim butonu */}
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
