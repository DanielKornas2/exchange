import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rates: ""
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

  handleClick = (key) => {
    console.log(key)
  }


  render() {
    const rates = this.state.rates
        
    return (
      <div className="App container">
        <ul>      
        {Object.keys(rates).map((key) => {
          return <li key={key} onClick={() => this.handleClick({key})}>Key: {key}, Value: {rates[key]}</li>;
        })}
        </ul>
        <Button>Bootstrap button works fine</Button>
      </div>
    );
  }
}

export default App;
