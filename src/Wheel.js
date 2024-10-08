import React, { useState } from 'react';
import './Wheel.css'; // CSS dosyasını unutma
import { ethers } from 'ethers';

const Wheel = () => {
  const [prize, setPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [isMuted, setIsMuted] = useState(false); // Sesin açık/kapalı durumu
  const kittyTokenAddress = "0x0fd8a8af456b09c85bd63c65308e47c10da756a1"; // KITTY token kontrat adresi
  const kittyDecimals = 18; // KITTY token'ın ondalık sayısı

  // Ses dosyasını yükle
  const spinSound = new Audio('/spin-sound.mp3');

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Ses çalma
    if (!isMuted) {
      spinSound.play();
    }

    const deg = Math.floor(5000 + Math.random() * 5000); // 5000 ile 10000 derece arasında rastgele bir açı
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    wheel.style.transform = `rotate(${deg}deg)`;

    setTimeout(() => {
      const sectors = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Dilimler
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

  const claimReward = async () => {
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      spinSound.play(); // Ses açıldığında ses çalsın
    } else {
      spinSound.pause(); // Ses kapandığında durdur
      spinSound.currentTime = 0; // Sesin başlangıcına geri döner
    }
  };

  return (
    <div className="wheel-container">
      <div id="wheel" className="wheel">
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className="sector">{i * 10}</div>
        ))}
        <div className="center-text">100</div> {/* Ortada 100 yazısı */}
      </div>
      <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      <button onClick={connectWallet} className="connect-button">
        Connect Wallet
      </button>
      {prize !== null && (
        <>
          <div className="prize-display">Your Prize: {prize} KITTY</div>
          <button onClick={claimReward} className="claim-button">
            Claim Reward
          </button>
        </>
      )}
      <div className="music-controls">
        <button onClick={toggleMute} className="mute-button">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
};

export default Wheel;

