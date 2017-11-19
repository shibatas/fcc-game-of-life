import React, { Component } from 'react';
import Footer from './assets/footer';
import { size, boardWidth, rate, density, initState, defaultState } from './config.js'
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
      running: false,
      selected: 'default'
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
          <div>
            <select id="savedBoards" onChange={this.handleDropdown} value={this.state.selected}>
              <option id="default" value="default">Choose a Starting Pattern</option>
              <option id="random" value="random">Random</option>
              <option id="saved" value="saved">Last Saved</option>
              <option id="default-1" value="1">"Gliders"</option>
              <option id="default-2" value="2">"Pentadecathlon"</option>
              <option id="default-3" value="3">"Gosper Glider Gun"</option>
            </select>
          </div>
          <button id="save" onClick={this.handleClick}>Save</button>
          <button id="clear" onClick={this.handleClick}>Clear</button>
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
    } else if (action === 'clear') {
      this.clearBoard();
    } else {
      this.modifyCell(e.target.id);
    }
  }
  handleDropdown = (e) => {
    this.setBoard(e.target.value);
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
    clearInterval(this.state.intervalId);
    localStorage.setItem('shibatasGameOfLife', JSON.stringify(this.state.fullBoard));
    alert("Current state saved. Click RESET to come back to this state.");
    this.setState({running: false});
    console.log("saved as 'shibatasGameOfLife' in localStorage");
  }
  setBoard = (value) => {
    console.log('reset');
    clearInterval(this.state.intervalId);
    let data = Object.assign({}, initState);
    let selected = 'default';
    if (value === 'default') {
      return;
    } else if (value === 'random') {
      this.randomGenerate();
      selected = 'random';
      return;
    } else if (value === 'saved' && localStorage.getItem('shibatasGameOfLife')) {
      console.log('from localStorage');
      data = JSON.parse(localStorage.getItem('shibatasGameOfLife'));
      selected = 'local';
    } else if (value) {
      console.log('from set pattern', value);
      let id = parseInt(value);
      data = defaultState[id-1];
      selected = value;
    }
    this.setState({
      fullBoard: data,
      update: data,
      running: false,
      selected: selected
    });
  }
  clearBoard = () => {
    console.log('clear board');
    clearInterval(this.state.intervalId);
    this.setState({
      fullBoard: Object.assign({}, initState),
      update: Object.assign({}, initState),
      running: false,
      selected: 'default'
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
      update: randomBoard,
      selected: 'random'
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
      <div className="board-inner">
        {this.props.renderBoard}
      </div>
    );
  }
}

export default Parent;
