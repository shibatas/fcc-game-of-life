import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

var DATA = [];
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
class Explain extends Component {
  render() {
    return (
      <div>
        <p>Below are the most active users of&nbsp;
        <a href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer">freeCodeCamp</a>.</p>
        <p>Sort by recent or all-time results by clicking on table header.</p>
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
  //gets data from appropriate external API and sets state
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
    this.fetch(e.target.id);
  }
  render() {
    //default CSS classes for table
    let classes = {
      recent: {
        title: 'data-column link ',
        body: ''
      },
      alltime: {
        title: 'data-column link ',
        body: ''
      }
    }
    //default table title texts in JSX
    let text = {
      recent:  <span id={'recent'}>Last 30 Days</span>,
      alltime: <span id={'alltime'}>All Time</span>
    };
    //set CSS classes and title text for sorted column
    //and make unsorted column title into a link
    if (this.state.sort === 'recent') {
      text.recent = <span id={'recent'}>Last 30 Days &#9660;</span>;
      classes.recent.title += 'highlight';
      classes.recent.body += 'highlight';
    } else if (this.state.sort === 'alltime') {
      text.alltime = <span id={'alltime'}>All Time &#9660;</span>;
      classes.alltime.title += 'highlight';
      classes.alltime.body += 'highlight';
    }

    return (
      <table>
        <TitleRow
          classes={classes}
          text={text}
          action={this.clickHandler}
        />
        <DataRow
          classes={classes}
          text={text}
          data={this.state.data}
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
          <th
            className={'rank-column'}
          >Rank</th>
          <th>User</th>
          <th
            id={'recent'}
            className={this.props.classes.recent.title}
            onClick={this.props.action}
          >{this.props.text.recent}</th>
          <th
            id={'alltime'}
            className={this.props.classes.alltime.title}
            onClick={this.props.action}
          >{this.props.text.alltime}</th>
        </tr>
      </thead>
    );
  }
};
class DataRow extends Component {
  render() {
    const rows = [];
    let classes = this.props.classes;
    this.props.data.forEach(function(item, index) {
      let PageUrl = 'https://www.freecodecamp.org/' + item.username;
      let AvatarUrl = item.img;
      rows.push(
        <tr key={item.username}>
          <td>{index + 1}</td>
          <td className={'user-column'}>
            <img src={AvatarUrl} alt="User Avatar"></img><a href={PageUrl}>{item.username}</a>
          </td>
          <td className={classes.recent.body}>{item.recent}</td>
          <td className={classes.alltime.body}>{item.alltime}</td>
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
          See my other work on <a className="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"></a>  and
          <a className="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"></a>.</p>
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
        <Explain />
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
