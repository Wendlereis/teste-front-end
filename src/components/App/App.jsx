import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Search from '../Search/Search'
import Details from '../Details/Details'

import '../../assets/css/App.css'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
         <Switch>
           <Route exact path="/" component={Search} />
           <Route path="/Details/:id" component={Details} />
         </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
