import React, { Component } from 'react';
import Footer from './assets/footer';
import './App.css';

class Parent extends Component {
  render() {
    return (
      <div>
        <Header />
        <App />
        <Footer />
      </div>
    );
  }
}
class Header extends Component {
    render() {
      return (
        <header>
          <div className="banner">
            <h1 className='title'>Game of Life</h1>
          </div>
        </header>
      );
    }
}

//From here is all the app contents!
class App extends Component {
  constructor() {
    super();
    this.state = {
      size: [150, 100]
    }
  }
  render() {
    return (
      <div className="app">
        <Board size={this.state.size} />
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    const initState = {};
    for (let j=0; j<this.props.size[1]; j++) {
      for (let i=0; i<this.props.size[0]; i++) {
        initState[i+'x'+j] = "dead"
      }
    }
    this.state = initState;
  }
  render() {
    let size = this.props.size;
    let tileW = 5, tileH = 5;
    let box = [];
    for (let j=0; j<size[1]; j++) {
      let row = [];
      for (let i=0; i<size[0]; i++) {
        let pos = i+'x'+j;
        row.push(
          <span id={pos} className={this.state[pos]} onClick={this.handleClick} >
            <svg id={pos} width={tileW} height={tileH}>
              <rect id={pos} className={this.state[pos]} width={tileW} height={tileH} />
            </svg>
          </span>
        );
      }
      box.push(
        <div id={'row'+j} style={{height: tileH}}>{row}</div>
      );
    }
    return (
      <div>
        {box}
      </div>
    );
  }
  handleClick = (e) => {
    this.change(e.target.id);
  }
  change = (id) => {
    let newState = {}
    if (this.state[id] === 'dead') {
      newState[id] = 'live';
    } else if (this.state[id] === 'live') {
      newState[id] = 'dead';
    }
    this.setState(newState);
  }
}

export default Parent;
