import React, { Component } from 'react';
import Footer from './assets/footer';
import { size, rate, density } from './config.js'
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
  constructor(props) {
    super(props);
    const initState = {};
    for (let j=0; j<size[1]; j++) {
      for (let i=0; i<size[0]; i++) {
        initState[i+'x'+j] = "dead"
      }
    }
    this.state = {
      board: initState,
      intervalId: null
    }
  }
  componentWillMount() {
    this.randomGenerate();
  }
  componentDidMount() {
    //console.log(this.state.board);
  }
  componentDidUpdate() {
    //console.log(this.state.board);
  }
  render() {
    let tileW = size[0]/3, tileH = tileW;
    let box = [];
    for (let j=0; j<size[1]; j++) {
      let row = [];
      for (let i=0; i<size[0]; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} className={this.state.board[pos]} onClick={this.handleClick} >
            <svg width={tileW} height={tileH}>
              <rect id={pos} className={this.state.board[pos]} width={tileW} height={tileH} />
            </svg>
          </span>
        );
      }
      box.push(
        <div key={'row'+j} id={'row'+j} style={{height: tileH}}>{row}</div>
      );
    }
    return (
      <div className="app">
        <div className="board">
          {box}
          <button id="start" onClick={this.startStop}>Start</button>
          <button id="pause" onClick={this.startStop}>Pause</button>
          <button id="clear" onClick={this.clearBoard}>Clear</button>
          <button id="random" onClick={this.randomGenerate}>Random</button>
        </div>
      </div>
    );
  }
  clearBoard = () => {
    console.log('clear board');
    let newBoard = this.state.board;
    for (const prop in newBoard) {
      newBoard[prop] = 'dead';
    }
    this.setState(newBoard);
  }
  randomGenerate = () => {
    console.log('random generate');
    this.clearBoard();
    let newBoard = this.state.board;
    for (const prop in newBoard) {
      if (Math.random() < density) {
        newBoard[prop] = 'live';
      }
    }
    this.setState(newBoard);
  }
  startStop = (e) => {
    let id = null;
    if (e.target.id === 'start') {
      id = setInterval(() => {
        this.stepForward();
      }, rate);
    } else {
      clearInterval(this.state.intervalId);
    }
    this.setState({intervalId: id});
  }
  handleClick = (e) => {
    this.modifyCell(e.target.id);
  }
  modifyCell = (id) => {
    let newBoard = this.state.board;
    if (newBoard[id] === 'dead') {
      newBoard[id] = 'live';
    } else if (newBoard[id] === 'live') {
      newBoard[id] = 'dead';
    }
    this.setState({board: newBoard});
  }
  stepForward = () => {
    //handles update according to game rules
    //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by overpopulation.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let currentBoard = this.state.board;
    let newBoard = {};
    for (const prop in currentBoard) {
      newBoard[prop] =  this.getNextState(prop);
    }
    this.setState({board: newBoard});
  }
  getNextState = (id) => {
    let oldState = this.state.board[id];
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
      if (this.state.board[val] === 'live') {
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
