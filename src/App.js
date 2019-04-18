import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '@components/login/login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}
export default App;
