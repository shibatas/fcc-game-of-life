import React, { Component } from 'react';
import Footer from './assets/footer';
import { size, cell, rate, density, initState } from './config.js'
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
    let data = Object.assign({}, initState);
    if (localStorage.getItem('shibatasGameOfLife')) {
      data = JSON.parse(localStorage.getItem('shibatasGameOfLife'));
    }
    data.intervalId = null;
    data.running = false;
    this.state = data;
  }
  componentWillMount() {
    console.log(this.state);
    if (!localStorage.getItem('shibatasGameOfLife')) {
      this.randomGenerate();
    }
  }
  render() {
    let tileW = cell[0], tileH = cell[1];
    let box = [];
    for (let j=0; j<size[1]; j++) {
      let row = [];
      for (let i=0; i<size[0]; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} className={this.state[pos]} onClick={this.handleClick} >
            <svg width={tileW} height={tileH}>
              <rect id={pos} className={this.state[pos]} width={tileW} height={tileH} />
            </svg>
          </span>
        );
      }
      box.push(
        <div key={'row'+j} id={'row'+j} style={{height: tileH}}>{row}</div>
      );
    }
    //set css width/height for the Board
    let boardWidth = size[0]*cell[0];
    return (
      <div className="app" style={{width:boardWidth}}>
        <p>Welcome! This is my recreation of John Horton Conway&#39;s <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">Game of Life</a>.</p>
        <div className="board">
          { !this.state.running ?
            <button id="start" onClick={this.handleClick}>Start</button> :
            <button id="pause" onClick={this.handleClick}>Pause</button>
          }
          {box}
          <button id="save" onClick={this.handleClick}>Save</button>
          <button id="reset" onClick={this.handleClick}>Reset</button>
          <button id="clear" onClick={this.handleClick}>Clear</button>
          <button id="random" onClick={this.handleClick}>Random</button>
        </div>
      </div>
    );
  }
  handleClick = (e) => {
    let action = e.target.id;
    if (action === 'start' || action === 'pause') {
      this.startStop(action);
    } else if (action === 'save') {
      this.saveBoard();
    } else if (action === 'reset') {
      this.resetBoard();
    } else if (action === 'clear') {
      this.clearBoard();
    } else if (action === 'random') {
      this.randomGenerate();
    } else {
      this.modifyCell(e.target.id);
    }
  }
  startStop = (action) => {
    console.log('start stop');
    let id = null;
    if (action === 'start') {
      id = setInterval(() => {
        this.stepForward();
      }, rate);
    } else {
      clearInterval(this.state.intervalId);
    }
    this.setState({
      intervalId: id,
      running: !this.state.running
    });
  }
  saveBoard = () => {
    console.log('save');
    clearInterval(this.state.intervalId);
    localStorage.setItem('shibatasGameOfLife', JSON.stringify(this.state));
    alert("Current state saved. Click RESET to come back to this state.");
  }
  resetBoard = () => {
    console.log('reset');
    clearInterval(this.state.intervalId);
    let data = Object.assign({}, initState);
    if (localStorage.getItem('shibatasGameOfLife')) {
      data = JSON.parse(localStorage.getItem('shibatasGameOfLife'));
    }
    this.setState(data);
  }
  clearBoard = () => {
    console.log('clear board');
    console.log('initState', initState);
    clearInterval(this.state.intervalId);
    this.setState({board: Object.assign({}, initState)});
  }
  randomGenerate = () => {
    console.log('random generate');
    let newBoard = {};
    for (const prop in initState) {
      if (Math.random() < density) {
        newBoard[prop] = 'live';
      } else {
        newBoard[prop] = 'dead';
      }
    }
    this.setState(newBoard);
  }
  modifyCell = (id) => {
    console.log(id);
    let newBoard = Object.assign({}, this.state);
    if (newBoard[id] === 'dead') {
      newBoard[id] = 'live';
    } else if (newBoard[id] === 'live') {
      newBoard[id] = 'dead';
    }
    this.setState(newBoard);
  }
  stepForward = () => {
    //handles update according to game rules
    //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by overpopulation.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let currentState = Object.assign({}, this.state);
    delete currentState.intervalId;
    delete currentState.running;
    let nextState = {};
    //if no buffer, calculate next state as well as fill buffer
    for (const id in currentState) {
      if (this.getNextState(id, currentState)) {
        nextState[id] =  this.getNextState(id, currentState);
      }
    }
    this.setState({board: nextState});
  }
  getNextState = (id, currentState) => {
    let oldState = currentState[id];
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
      if (currentState[val] === 'live') {
        return sum+1;
      } else { return sum }
    }, 0);
    //return the appropriate new state
    let newState = '';
    if (oldState === 'dead') {
      if (sum === 3) {
        newState = 'live';
      } else {
        newState = null;
      }
    } else if (sum < 2 || sum > 3) {
      newState = 'dead';
    } else {
      newState = null;
    }
    return newState;
  }
}

export default Parent;
