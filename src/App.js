import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routerConfig } from "@/router/router";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/goods" component={Goods} />
        </Switch>
      </Router>
    )
  }
}
export default App;
