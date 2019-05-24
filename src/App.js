import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '@components/login/login';
import Goods from '@components/goods/goods';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/goods" component={Goods} />
      </Router>
    )
  }
}
export default App;
