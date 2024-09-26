// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ethers } from 'ethers';

// Function: Connect wallet and claim tokens
async function connectAndClaim() {
    // Create provider to connect user's Ethereum wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    try {
        // Request wallet accounts from the user
        await provider.send("eth_requestAccounts", []);
        
        const signer = provider.getSigner();
        const contractAddress = "0x0fd8a8af456b09c85bd63c65308e47c10da756a1"; 
        const contractABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claim",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        // Execute the claim operation
        const tx = await contract.claim(); // Call the claim function
        console.log('Claim operation started:', tx.hash);
        
        // Wait for the transaction to be confirmed
        await tx.wait();
        console.log('Tokens successfully claimed!'); 
    } catch (error) {
        console.error('Claim operation failed:', error.message);
    }
}

// Application component wrapper
const AppWrapper = () => {
    React.useEffect(() => {
        connectAndClaim();
    }, []);

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);

// Performance measurement
reportWebVitals();
