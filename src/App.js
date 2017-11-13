import React, { Component } from 'react';
import Footer from './assets/footer';
import { size, boardWidth, rate, density, initState } from './config.js'
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
    let fullBoard = Object.assign({}, initState);
    if (localStorage.getItem('shibatasGameOfLife')) {
      fullBoard = JSON.parse(localStorage.getItem('shibatasGameOfLife'));
    }
    this.state = {
      fullBoard,
      update: null,
      intervalId: null,
      running: false
    }
  }
  componentWillMount() {
    if (!localStorage.getItem('shibatasGameOfLife')) {
      this.randomGenerate();
    }
  }
  render() {
    return (
      <div className="app" style={{width:boardWidth}}>
        <p>Welcome! This is my recreation of John Horton Conway&#39;s <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">Game of Life</a>.</p>
        <div className="board">
          { !this.state.running ?
            <button id="start" onClick={this.handleClick}>Start</button> :
            <button id="pause" onClick={this.handleClick}>Pause</button>
          }
          <Board update={this.state.update} renderBoard={this.generateBoard(size[0],size[1])} modifyCell={this.handleClick} />
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
    localStorage.setItem('shibatasGameOfLife', JSON.stringify(this.state.fullBoard));
    alert("Current state saved. Click RESET to come back to this state.");
    this.setState({running: false});
  }
  resetBoard = () => {
    console.log('reset');
    clearInterval(this.state.intervalId);
    let data = Object.assign({}, initState);
    if (localStorage.getItem('shibatasGameOfLife')) {
      data = JSON.parse(localStorage.getItem('shibatasGameOfLife'));
    }
    this.setState({
      fullBoard: data,
      update: data,
      running: false
    });
  }
  clearBoard = () => {
    console.log('clear board');
    clearInterval(this.state.intervalId);
    this.setState({
      fullBoard: Object.assign({}, initState),
      update: Object.assign({}, initState),
      running: false
    });
  }
  randomGenerate = () => {
    console.log('random generate');
    let randomBoard = {};
    for (const prop in initState) {
      if (Math.random() < density) {
        randomBoard[prop] = 'live';
      } else {
        randomBoard[prop] = 'dead';
      }
    }
    this.setState({
      fullBoard: randomBoard,
      update: randomBoard
    });
  }
  modifyCell = (id) => {
    let newState = {};
    newState[id] = 'dead';
    if (this.state.fullBoard[id] === 'dead') {
      newState[id] = 'live';
    }
    this.setState({
      fullBoard: Object.assign(this.state.fullBoard, newState),
      update: newState
    });
  }
  stepForward = () => {
    //handles update according to game rules
    //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by overpopulation.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let currentState = Object.assign({}, this.state.fullBoard);
    let nextUpdate = {};
    for (const id in currentState) {
      if (this.getNextState(id, currentState)) {
        nextUpdate[id] =  this.getNextState(id, currentState);
      }
    }
    this.setState({
      fullBoard: Object.assign(currentState, nextUpdate),
      update: nextUpdate
    });
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
  generateBoard = (x, y) => {
    let w = boardWidth / x;
    let h = w;
    let board = [];
    for (let j=0; j<y; j++) {
      let row = [];
      for (let i=0; i<x; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} onClick={this.handleClick} >
            <svg width={w} height={h}>
              <rect id={pos} className={this.state.fullBoard[pos]} width={w} height={h} />
            </svg>
          </span>
        );
      }
      board.push(
        <div key={'row'+j} id={'row'+j} style={{height: h}}>{row}</div>
      );
    }
    return board;
  }
}
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentWillReceiveProps() {
    this.setState(this.props.update);
  }
  render() {
    return (
      <div>
        {this.props.renderBoard}
      </div>
    );
  }
}

export default Parent;
