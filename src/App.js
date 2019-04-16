import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const PrimaryLayout = () => (
  <div>
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

class App extends Component {
  render() {
    return (
      <Router>
        {/*<Route path={'/'} component={HelloWorld} />*/}
        <PrimaryLayout />
      </Router>
    )
  }
}
export default App;
