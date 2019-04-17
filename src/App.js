import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to  the Tornadoes Website!</h1>
  </div>
);

const PlayerApi = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() {
    return this.players;
  },
  get: function(id) {
    const isPlayer = p => p.number === id;
    return this.players.find(isPlayer);
  }
};

const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerApi.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

const Player = (props) => {
  const player = PlayerApi.get(
    parseInt(props.match.params.number, 10)
  );
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      
    </div>
  )
};


class App extends Component {
  render() {
    return (
      <Router>
        <div>
        </div>
      </Router>
    )
  }
}
export default App;
