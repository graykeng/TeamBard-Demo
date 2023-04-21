import React from "react";
import { useState } from 'react'
import './App.css'
import { getJSON } from "./API";

function App() {

  const [data, setData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [showList, setShowList] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleClick() {
    setError('');
    setData({});
    setShowError(false);
    setShowList(false);
    getJSON(inputValue)
      .then(data => {
        setData(data);
        setShowList(true)})
      .catch(error => {
        setError("Please enter a valid shop number."); 
        setShowError(true); });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleClick();
  };

  return (
    <div className="total">

      <div className="title-blue-bar"></div>
      <div className="title">
        <div className="title-image-container">
          <img src="./ICBCLogo.svg" alt="ICBC" width={60} height={60}/>
        </div>
        <div className="title-text">
          TeamBard
        </div>
        <div className="inputField">
          <div className="input">
            <div className="search-container">
              <form onSubmit={handleFormSubmit}>
                <input type="text" className="search-input" placeholder="Search..." value={inputValue} onChange={handleInputChange} />
                <button className="search-button" type="submit">Fetch</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        {showError && <div className="error">{error}</div>}
        {showList && <div className="list">{
          <table>
            <tbody>
              <tr>
                <td>Supplier: </td>
                <td>{data.Supplier_Name}</td>
              </tr>

              <tr>
                <td>Repair Ratio: </td>
                <td className="repair_ratio">{(data.repair_ratio)*100}% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(TARGET: 35%)</td>
              </tr>

              <tr>
                <td>Category: </td>
                <td>{data.Tier}</td>
              </tr>

              <tr>
                <td>Percentage in Category: </td>
                <td>{data.percent}%</td>
              </tr>
              
              <tr>
                <td>Rank: </td>
                <td>{data.Rank}</td>
              </tr>

              { (data.repair_ratio >= 0.35) && 
              (<tr>
                <td>Actual Repair Rebate: </td>
                <td>${data.Repair_Rebate}</td>
              </tr>) }

              { (data.repair_ratio < 0.35) && 
              (<tr>
                <td>Predicted Repair Rebate: </td>
                <td>${data.Repair_Rebate}</td>
              </tr>) }

              { (data.repair_ratio >= 0.35) &&
              (<tr>
                <td>Actual Replacement Rebate: </td>
                <td>${data.Replacement_Rebate}</td>
              </tr>) }

              { (data.repair_ratio < 0.35) && 
              (<tr>
                <td>Predicted Replacement Rebate: </td>
                <td>${data.Replacement_Rebate}</td>
              </tr>) }

              <tr>
                <td>Number of Claims: </td>
                <td>{data.New_Totals}</td>
              </tr>

              <tr>
                <td>Windshield Repair Needed in Average per Month: </td>
                <td>{data.avg}</td>
              </tr>

              <tr>
                <td>Last 4 Quarters Repair Ratio: </td>
                <td>{(data.rrq[0]*100).toFixed(2)}%, {(data.rrq[1]*100).toFixed(2)}%, {(data.rrq[2]*100).toFixed(2)}%, {(data.rrq[3]*100).toFixed(2)}%</td>
              </tr>

              <tr>
                <td>Trend: </td>
                {( (data.trend_message.includes("upward")) &&
                (
                  <td className="green">
                      {data.trend_message}
                  </td>
                ))}

                {( (data.trend_message.includes("downward")) &&
                (
                  <td className="red">
                      {data.trend_message}
                  </td>
                ))}
              </tr>

              {(data.repair_ratio >= 0.25 && data.repair_ratio < 0.35 && data.Totals > 306) && 
              (<tr>
                <td>Suggestion: </td>
                <td>As the shop has ratio greater than 25% and claims greater than province median, the suggested target ratio should be 25%.</td>
              </tr>)}
              
            </tbody>
          </table>
        }</div>}
      </div>
      <div>
        <iframe title="iframe" style={{ width: '95%', height: '100vh', border: 'none' }} src="https://lookerstudio.google.com/embed/reporting/5b7edf5b-fa69-410a-b32a-267a62f84857/page/SRSND" allowFullScreen></iframe>
      </div>

    </div>
  );
}

export default App;
