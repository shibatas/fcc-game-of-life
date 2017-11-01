import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './App.css';

//url for last 30 days leader
var url1 = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
//url for all time leaders
var url2 = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
class App extends Component {
  render() {
    return (
      <div className="header">
        <h1>FCC Camper Leaderboard</h1>
      </div>
    );
  }
}; //learn how to add children to App Component
class titleRow extends Component {
  render() {
    //learn to loop the th tag elements
    return (
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Last 30 Days</th>
        <th>All Time</th>
      </tr>
    );
  }
};
class table extends Component {
  render() {
    return (
      <table>
        <titleRow />
      </table>
    );
  }
};
class footer extends Component {
  render() {
    return (
      <footer>
        <hr/>
          <p>This is a <a href="https://www.freecodecamp.org/challenges/build-a-markdown-previewer" target="_blank">freeCodeCamp project</a>.
          See my other work on <a class="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank"></a> and
          <a class="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank"></a></p>
          <p>Shohei Shibata &#9426; copyright 2017</p>
      </footer>
    );
  }
};

$(document).ready(function() {
  console.log('test');
  $.getJSON(url1, function(data) {
    console.log(data[0]);
  });
});
/*
class App extends Component {
  render() {
    return (
      <div>
        <top />
        <table />
      </div>
    );
  }
};
*/
/* Use ReactDOM for CodePen
ReactDOM.render(
    React.createElement('div', {},
      React.createElement(header),
      React.createElement(table)),
    document.getElementById('root')
);
*/



export default App;
