import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

var DATA = []
//url for last 30 days leader
var url1 = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
//url for all time leaders
var url2 = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class Top extends Component {
  render() {
    return (
      <div className="header">
        <h1>FCC Camper Leaderboard</h1>
      </div>
    );
  }
}; //learn how to add children to App Component
class TitleRow extends Component {
  render() {
    //learn to loop the th tag elements
    return (
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Last 30 Days</th>
          <th>All Time</th>
        </tr>
      </thead>
    );
  }
};
class DataRow extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: DATA
      }
  }
  componentDidMount() {
    $.getJSON(url1).then(result => {
      this.setState({
        data: result
      });
    });
  }

  render() {
    const rows = [];
    this.state.data.forEach(function(item, index) {
      rows.push(
        <tr key={item.username}>
          <td>{index + 1}</td>
          <td>{item.username}</td>
          <td>{item.recent}</td>
          <td>{item.alltime}</td>
        </tr>
      );
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
};
class Footer extends Component {
  render() {
    return (
      <footer>
        <hr/>
          <p>This is a <a href="https://www.freecodecamp.org/challenges/build-a-camper-leaderboard" target="_blank" rel="noopener noreferrer">freeCodeCamp project</a>.
          See my other work on <a className="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"></a> and
          <a className="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"></a></p>
          <p>Shohei Shibata &#9426; copyright 2017</p>
      </footer>
    );
  }
};
class App extends Component {
  render() {
    return (
      <div>
        <Top />
        <table>
          <TitleRow />
          <DataRow />
        </table>
        <Footer />
      </div>

    );
  }
};

/* Use ReactDOM for CodePen
ReactDOM.render(
    React.createElement('div', {},
      React.createElement(header),
      React.createElement(table)),
    document.getElementById('root')
);
*/



export default App;
