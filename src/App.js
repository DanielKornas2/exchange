import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rates: "",
      moneyAmount: 0,
      chosenCurrency: "PLN",
    }
  }

  componentDidMount(){
    fetch('http://data.fixer.io/api/latest?access_key=734ef11aaa5f72ab3a0bcb01826f7eb4')
      .then(response => response.json())
      .then((responseData)=> {
        this.setState({
          rates: responseData.rates,          
        })
      });  
  }

  handleCurrencyChoice = (key) => {
    this.setState({
      chosenCurrency: key.key,
   })
  }

  handleMoneyAmount = (e) => {
    this.setState({
      moneyAmount: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    })
  }

  handleResetData = (e) => {
    this.setState({
      moneyAmount: 0,
      chosenCurrency: "PLN"
    })
  }


  render() {
    const {rates, chosenCurrency, moneyAmount} = this.state;
    console.log(rates[chosenCurrency])

    return (
      <div className="App container">
        
        <ul>      
        {Object.keys(rates).map((key) => {
          return <li key={key} onClick={() => this.handleCurrencyChoice({key})}>Key: {key}, Value: {rates[key]}</li>;
        })}
        </ul>
        <input type="number" onChange={this.handleMoneyAmount} value={moneyAmount} /> 
        euro is {chosenCurrency? (rates[chosenCurrency] * moneyAmount) : null} {chosenCurrency}
        <Button onClick={this.handleResetData}>Restore default</Button>
      </div>
    );
  }
}

export default App;
