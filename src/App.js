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
};
class Table extends Component {
  constructor(props) {
      super(props);
      this.clickHandler = this.clickHandler.bind(this);
      this.state = {
        data: DATA,
        sort: 'recent'
      }
  }
  componentDidMount() {
    $.getJSON(url1).then(result => {
      this.setState({
        data: result,
        sort: 'recent'
      });
    });
  }
  fetch(sort) {
    let url = '';
    if (sort === 'recent') {
      url = url1;
    } else if (sort === 'alltime') {
      url = url2;
    }
    $.getJSON(url).then(result => {
      this.setState({
        data: result,
        sort: sort
      });
    });
  }
  clickHandler(e) {
    e.preventDefault();
    this.fetch(e.target.id);
  }
  render() {
    let sort = {
      recent: {
        class: '',
        text: <span>Last 30 Days</span>
      },
      alltime: {
        class: '',
        text: <span>All Time</span>
      }
    };

    if (this.state.sort === 'recent') {
      sort.recent.class = 'highlight';
      sort.recent.text =  <span>Last 30 Days &#9207;</span>
    } else if (this.state.sort === 'alltime') {
      sort.alltime.class = 'highlight';
      sort.alltime.text =  <span>All Time &#9207;</span>
    }

    return (
      <table>
        <TitleRow
          sort={sort}
          action={this.clickHandler}
        />
        <DataRow
          data={this.state.data}
          sort={sort}
        />
      </table>
    );
  }
};
class TitleRow extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th
            id={'recent'}
            className={this.props.sort.recent.class}
            onClick={this.props.action}
          >{this.props.sort.recent.text}</th>
          <th
            id={'alltime'}
            className={this.props.sort.alltime.class}
            onClick={this.props.action}
          >{this.props.sort.alltime.text}</th>
        </tr>
      </thead>
    );
  }
};
class DataRow extends Component {
  render() {
    const rows = [];
    let sort = this.props.sort;
    this.props.data.forEach(function(item, index) {
      rows.push(
        <tr key={item.username}>
          <td>{index + 1}</td>
          <td>{item.username}</td>
          <td className={sort.recent.class}>{item.recent}</td>
          <td className={sort.alltime.class}>{item.alltime}</td>
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
        <Table />
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
