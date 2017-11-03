import React, { Component } from 'react';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>App Coming Soon...</p>
        <Footer />
      </div>
    );
  }
};

class Header extends Component {
    render() {
      return (
        <header>
          <div className="banner">
            <h1 className='title'>Recipe Box</h1>
          </div>
          <p>Add, edit, or view your recipes below.</p>
          <p>Your data is automatically stored, so you can come back and see it again later.</p>
        </header>
      );
    }
}
class Footer extends Component {
  render() {
    return (
      <footer>
        <hr/>
          <p>This is a <a href="https://www.freecodecamp.org/challenges/build-a-camper-leaderboard" target="_blank" rel="noopener noreferrer">freeCodeCamp project</a>.
          See my other work on <a className="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"></a>  and
          <a className="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"></a>.</p>
          <p>Shohei Shibata &#9426; copyright 2017</p>
      </footer>
    );
  }
}

export default App;
