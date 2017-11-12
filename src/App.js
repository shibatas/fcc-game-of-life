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
      size: [50, 30]
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
    let tileW = 15, tileH = 15;
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
        <div className="board">
          {box}
        </div>
        <div>
          <button id="nextStep" onClick={this.step}>Next Step</button>
        </div>
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
  step = () => {
    //handles update according to game rules
    //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by overpopulation.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let currentBoard = this.state;
    let newBoard = {};
    for (const prop in currentBoard) {
      newBoard[prop] =  this.nextState(prop);
    }
    this.setState(newBoard);
  }
  nextState = (id) => {
    let oldState = this.state[id];
    let current = id.split('x');
    let x = parseInt(current[0]);
    let y = parseInt(current[1]);
    //Get coordinates of all neighboring cells
    let neighbors = [];
    for (let i=-1; i<2; i++) {
      for (let j=-1; j<2; j++) {
        neighbors.push([(x+i)+'x'+(y+j)]);
      }
    }
    neighbors.splice(4,1);
    //get sum of surrounding live cells
    let sum = neighbors.reduce((sum, val) => {
      if (this.state[val] === 'live') {
        return sum+1;
      } else { return sum }
    }, 0);
    //return the appropriate new state
    let newState = '';
    if (oldState === 'dead') {
      if (sum === 3) {
        newState = 'live';
      } else {
        newState = 'dead';
      }
    } else if (sum < 2 || sum > 3) {
      newState = 'dead';
    } else {
      newState = 'live';
    }
    return newState;
  }
}

export default Parent;
