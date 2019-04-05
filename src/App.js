import React, { Component } from 'react';
import HelloWorld from '@components/HelloWorld.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path={'/'} component={HelloWorld} />
      </Router>
    )
  }
}
export default App;
