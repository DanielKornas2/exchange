import React, { Component } from 'react';
import './App.css';
import { InputGroup, InputGroupAddon, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rates: "",
      moneyAmount: 0,
      chosenCurrency: "PLN",
      dropdownOpen: false
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
    if (e.target.value = e.target.value || 0){
      this.setState({
        moneyAmount: 0,
      })
    }
    this.setState({
      moneyAmount: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,
    })
  }

  handleResetData = (e) => {
    this.setState({
      moneyAmount: 0,
      chosenCurrency: "PLN"
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


  render() {
    const {rates, chosenCurrency, moneyAmount} = this.state;

    return (
      <div className="container">
       <div className="row mt-3">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="mx-auto">
          <DropdownToggle caret>Choose currency</DropdownToggle>
          <DropdownMenu>
            {Object.keys(rates).map((key) => {
              return <DropdownItem key={key} onClick={() => this.handleCurrencyChoice({key})}>{key}</DropdownItem>;
            })}
         </DropdownMenu>
        </Dropdown>
       </div>
      <div className="row mt-3">
        <div className="col-12 col-md-4 mx-auto">
         <InputGroup>
            <InputGroupAddon addonType="prepend">&euro;</InputGroupAddon>
            <Input type="number" step="1" onChange={this.handleMoneyAmount} value={Number(moneyAmount).toString()} />
         </InputGroup>
          is {chosenCurrency? (rates[chosenCurrency] * moneyAmount) : null} <strong>{chosenCurrency}</strong>
        </div>
      </div>
        <div className="row mt-3">
        <Button onClick={this.handleResetData} className="mx-auto">Restore default</Button>
        </div>
      </div>
    );
  }
}

export default App;
