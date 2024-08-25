import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [result, setResult] = useState('');
  const contractAddress ='0x206Ed50010d3EF50ef6D7bE01AbA571248EF1990'; 
  const abi = [  {
    "inputs": [],
    "name": "flip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_guess",
        "type": "bool"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }];

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const newContract = new web3.eth.Contract(abi, contractAddress);
      setContract(newContract);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const placeBet = async (guess) => {
    if (!betAmount || !contract) return;
    const weiValue = Web3.utils.toWei(betAmount, 'ether');
    contract.methods.flip(guess).send({ from: account, value: weiValue })
      .on('transactionHash', function (hash) {
        setResult(`Transaction sent: ${hash}`);
      })
      .on('receipt', function (receipt) {
        const outcome = receipt.events.FlipOutcome.returnValues.outcome;
        setResult(`Transaction confirmed. You ${outcome ? 'won!' : 'lost!'}`);
      })
      .on('error', function (error) {
        setResult(`Error: ${error.message}`);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CoinFlip Game</h1>
        <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
        <p className="account-info">Your Account: {account}</p>
        <input 
          type="number" 
          className="bet-input" 
          placeholder="Bet Amount in ETH" 
          value={betAmount} 
          onChange={(e) => setBetAmount(e.target.value)} 
        />
        <div className="bet-buttons">
          <button className="bet-button" onClick={() => placeBet(true)}>Bet Heads</button>
          <button className="bet-button" onClick={() => placeBet(false)}>Bet Tails</button>
        </div>
        <p className="result">{result}</p>
      </header>
    </div>
  );
};

export default App;