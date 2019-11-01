import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [blockchain, setBlockchain] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    console.log("useEffect!");
    axios
      .get("http://127.0.0.1:5000/chain")
      .then(res => {
        setBlockchain(res.data.chain);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const checkBalance = () => {
    let currentBalance = 0;
    blockchain.forEach(block => {
      block.transactions.forEach(transaction => {
        console.log(transaction);
        if (transaction.recipient === id) {
          currentBalance += transaction.amount;
          setUserTransactions([...userTransactions, transaction]);
        } else if (transaction.sender === id) {
          currentBalance -= transaction.amount;
          setUserTransactions([...userTransactions, transaction]);
        }
      });
    });
    setBalance(currentBalance);
  };

  return (
    <div className="App">
      <h1>Hellllllooooooo</h1>
      <input
        type="string"
        value={id}
        onChange={e => {
          setId(e.target.value);
        }}
      />
      <button onClick={() => checkBalance()}>Set ID</button>
      <h3>Balance: {balance}</h3>
      {userTransactions.map((transaction, index) => {
        return <div key={index}>{`transaction #: ${index + 1}`}</div>;
      })}
    </div>
  );
}

export default App;
