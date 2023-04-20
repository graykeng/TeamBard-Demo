import React from "react";
import { useState } from 'react'
import './App.css'
import { getMessage } from "./API";

function App() {

  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleClick() {
    console.log(inputValue); // Replace with your fetch logic
    getMessage(inputValue).then(data => setMessage(data));
    console.log(message);
  }

  return (
    <div>

      <div className="title">
        TeamBard
      </div>
      <div className="message">
        <div className="input">
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleClick}>Fetch</button>
        </div>
          {message}
      </div>
      <div>
        <iframe title="iframe" style={{ width: '95%', height: '100vh', border: 'none' }} src="https://lookerstudio.google.com/embed/reporting/5b7edf5b-fa69-410a-b32a-267a62f84857/page/SRSND" allowFullScreen></iframe>
      </div>

    </div>
  );
}

export default App;
