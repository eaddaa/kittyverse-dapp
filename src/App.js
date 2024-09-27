import React, { useState } from 'react';
import { ethers } from 'ethers';
import { claimTokens } from './contract'; // Import the claimTokens function
import Wheel from './Wheel'; // Import the Wheel component

function App() {
    const [account, setAccount] = useState(null); // State to manage connected account
    const [isClaiming, setIsClaiming] = useState(false); // State to track claiming status

    // Function to connect the wallet
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum); // Change here
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

        const provider = new ethers.providers.Web3Provider(window.ethereum); // Change here
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
            <Wheel /> {/* Render the Wheel component */}
        </div>
    );
}

export default App;

