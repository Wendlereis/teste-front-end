import React, { Component } from 'react';

import logo from '../../assets/img/logo.svg';
import '../../assets/css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to iCasei Front-End Test</h1>
        </header>
      </div>
    );
  }
}

export default App;