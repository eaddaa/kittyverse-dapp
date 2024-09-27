import React, { useState } from 'react';
import { ethers } from 'ethers';
import { claimTokens } from './contract'; // Import the claimTokens function
import './App.css'; // Import CSS styles for the wheel

function App() {
    const [account, setAccount] = useState(null); // State to manage connected account
    const [isClaiming, setIsClaiming] = useState(false); // State to track claiming status
    const [prize, setPrize] = useState(null); // State to track the prize from the wheel

    // Function to connect the wallet
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum); 
                const accounts = await provider.send("eth_requestAccounts", []);
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    alert("No accounts found. Please check your wallet.");
                }
            } catch (error) {
                console.error("Error connecting wallet:", error);
                alert("Failed to connect wallet. Please check if MetaMask is installed and try again.");
            }
        } else {
            alert("MetaMask not installed! Please install it to use this feature.");
        }
    };

    // Function to handle claiming tokens
    const handleClaimTokens = async () => {
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        const signer = provider.getSigner();

        try {
            setIsClaiming(true); // Set claiming state to true
            await claimTokens(signer); // Call the claimTokens function
            alert("Tokens claimed successfully!");
        } catch (error) {
            console.error('Claim failed:', error.message);
            alert("Claim failed: " + error.message);
        } finally {
            setIsClaiming(false); // Reset claiming state
        }
    };

    // Function to spin the wheel
    const spinWheel = () => {
        const prizes = ['0 KITTY', '10 KITTY', '20 KITTY', '30 KITTY', '40 KITTY', '50 KITTY', '60 KITTY', '100 KITTY'];
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setPrize(prizes[randomIndex]); // Set the prize after spinning the wheel
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Kittyverse!</h1>
            {account ? (
                <>
                    <p>Connected Wallet: {account}</p>
                    <button onClick={handleClaimTokens} disabled={isClaiming} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
                        {isClaiming ? 'Claiming...' : 'Claim Tokens'}
                    </button>
                </>
            ) : (
                <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Connect Wallet
                </button>
            )}

            <div className="wheel-container">
                <div id="wheel" className="wheel">
                    <div className="segment" style={{ "--rotation": "0deg" }}>0 KITTY</div>
                    <div className="segment" style={{ "--rotation": "45deg" }}>10 KITTY</div>
                    <div className="segment" style={{ "--rotation": "90deg" }}>20 KITTY</div>
                    <div className="segment" style={{ "--rotation": "135deg" }}>30 KITTY</div>
                    <div className="segment" style={{ "--rotation": "180deg" }}>40 KITTY</div>
                    <div className="segment" style={{ "--rotation": "225deg" }}>50 KITTY</div>
                    <div className="segment" style={{ "--rotation": "270deg" }}>60 KITTY</div>
                    <div className="segment" style={{ "--rotation": "315deg" }}>100 KITTY</div>
                </div>
                <button id="spin" onClick={spinWheel}>Spin the Wheel</button>
            </div>

            {prize && <p>Your Prize: {prize}</p>}
        </div>
    );
}

export default App;
