import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { routerConfig } from "@/router/router";
import FrontendAuth from '@/router/FrontendAuth';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <FrontendAuth config={routerConfig} />
        </Switch>
      </Router>
    )
  }
}
export default App;
