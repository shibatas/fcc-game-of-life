import React, { Component } from 'react';
import { defaultRecipes, messages } from './initData.js';
import './App.css';

//create a list of all recipe names from initial data
//TO DO: if user data is stored, use that instead.
let recipes = defaultRecipes;

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
};
class Header extends Component {
    render() {
      return (
        <header>
          <div className="banner">
            <h1 className='title'>My Recipes</h1>
          </div>
          <p>Add, edit, or view your recipes below.</p>
          <p>Your data is automatically stored, so you can come back and see it again later.</p>
          <hr/>
        </header>
      );
    }
}
class Footer extends Component {
  render() {
    return (
      <footer>
        <hr/>
          <p>This is a <a href="https://www.freecodecamp.org/challenges/build-a-recipe-box" target="_blank" rel="noopener noreferrer">freeCodeCamp project</a>.
          See my other work on my <a href="http://shoheishibata.com/categories/Programming/" target="_blank" rel="noopener noreferrer">website</a> as well as<a className="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"></a>  and
          <a className="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"></a>.</p>
          <p>Shohei Shibata &#9426; copyright 2017</p>
      </footer>
    );
  }
}

//From here is all the app contents!
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null, //recipe array index position to be rendered
      recipes: recipes,
      messages: messages,
      showRecipe: false
    };
  }
  toggleRecipe = (e) => {
    this.setState({
      showRecipe: !this.state.showRecipe,
      id: e.target.id
    })
  }
  render() {
    return (
      <div className="app">
        <RecipeDetails show={this.state.showRecipe} id={this.state.id} toggle={this.toggleRecipe}/>
        <Messages messages={this.state.messages} />
        <RenderNames action={this.toggleRecipe} />
        <div className="app-footer">
          <hr/>
          <button>Add a new recipe</button>
        </div>
      </div>
    );
  }
}
class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(function(item, index){
          return <p key={index}>{item}</p>
        })}
      </div>
    );
  }
}
class RenderNames extends Component {
  render() {
    return (
      <div>
        {recipes.map((recipe, index) => {
          return <button id={recipe.id} key={recipe.id} onClick={this.props.action}>{recipe.name}</button>;
        })}
      </div>
    );
  }
}
class RecipeDetails extends Component {
  render() {
    if (this.props.show) {
      let recipe = recipes.find((item)=>{
        return item.id.toString() === this.props.id;
      });
      return (
        <div>
          <div className="backdrop" onClick={this.props.toggle}></div>
          <div className="modal">
            <div className="wrap">
              <button className="modal-close" onClick={this.props.toggle}>&#215;</button>
            </div>
            <h1>{recipe.name}</h1>
            <h3 className="left">Ingredients:</h3>
            <table>
              <thead>
                <tr>
                  <th width='70%'>Ingredient</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item[0]}</td>
                      <td>{item[1] + ' ' + item[2]}</td>
                    </tr> );
                })}
              </tbody>
            </table>
            <h3 className="left">Instructions:</h3>
            <table className="instructions">
              {recipe.instructions.map((item, index) => {
                return (
                    <tr key={index}>
                      <td width='50px'>{(index + 1) + '.'}</td>
                      <td>{item}</td>
                    </tr>
                );
              })}
            </table>
            <div className="modal-footer">
              <button>Edit this recipe</button>
              <button>Delete this recipe</button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Parent;
