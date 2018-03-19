import React, { Component } from 'react';
import Search from './Search';


class App extends Component {
  render() {
    return (
      <div className="App container">
          <h1 className="App-title" style={{'textAlign': 'center'}}>Cek Halal MUI</h1>
		  <Search />
		  <footer style={{'textAlign': 'center'}}>
		  	<a href="https://www.facebook.com/bangadam.dev"  rel='noopener noreferrer' style={{'color': 'blue'}} target="_blank">@bangadam.dev</a>
		  </footer>
      </div>
    );
  }
}

export default App;
