import React, { Component } from 'react';
import { defaultRecipes, defaultMessages, emptyRecipe } from './initData.js';
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
  constructor() {
    super();
    let data = defaultRecipes;
    let messages = defaultMessages;
    if (localStorage.getItem('savedRecipes')) {
      data = JSON.parse(localStorage.getItem('savedRecipes'));
      messages = [];
    }
    this.state = {
      allRecipes: data,
      currentRecipe: emptyRecipe,
      messages: messages,
      classes: {
        edit: "hidden",
        details: "hidden"
      }
    };
  }
  componentDidUpdate() {
    //update message
    let message = null;
    if (message !== this.state.messages) {
      this.setState({
        messages: message
      });
    }
    this.saveRecipes();
  }
  render() {
    return (
      <div className="app">
        <RecipeDetails show={this.state.classes.details} allRecipes={this.state.allRecipes} recipe={this.state.currentRecipe} toggle={this.toggleRecipe} edit={this.toggleEdit} deleteRecipe={this.deleteRecipe}/>
        <EditRecipe classes={this.state.classes.edit} recipe={this.state.currentRecipe} toggle={this.toggleEdit} submit={this.submitRecipe} />
        <Messages messages={this.state.messages} />
        <RenderNames allRecipes={this.state.allRecipes} action={this.toggleRecipe} />
        <div className="app-footer">
          <hr/>
          <button id="show-editor" onClick={this.toggleEdit}>Add a new recipe</button>
        </div>
      </div>
    );
  }
  saveRecipes = () => {
    localStorage.setItem('savedRecipes', JSON.stringify(this.state.allRecipes));
  }
  toggleRecipe = (e) => {
    let recipe = emptyRecipe;
    let classModal = "hidden";
    if (e.target.id) {
      recipe = this.state.allRecipes[parseInt(e.target.id)];
      classModal = "";
    }
    this.setState({
      classes: {
        details: classModal,
        edit: "hidden"
      },
      currentRecipe: recipe
    });
  }
  toggleEdit = (e) => {
    let recipe = emptyRecipe;
    let classEdit = "hidden";
    if (e) {
      classEdit = "";
      recipe = this.state.currentRecipe;
    }
    this.setState({
      classes: {
        details: "hidden",
        edit: classEdit
      },
      currentRecipe: recipe
    })
  }
  submitRecipe = (recipe) => {
    let data = this.state.allRecipes;
    let index = data.findIndex((item) => {
      return item.name === recipe.name;
    });
    if (recipe.name === '') {
      console.log('empty data');
    } else if (index !== -1) {
      console.log('data already exists');
      if (!Object.is(data[index], recipe)) {
        console.log('replace data', data[index], recipe);
        data.splice(index, 1, recipe);
      }
    } else {
      console.log('new data');
      data.push(recipe);
      this.setState({
        allRecipes: data
      });
      this.saveRecipes();
    }
  }
  deleteRecipe = (e) => {
    let data = this.state.allRecipes;
    let index = data.findIndex((item) => {
      return item.name === e.target.id;
    });
    data.splice(index, 1);
    this.setState({
      allRecipes: data,
      currentRecipe: emptyRecipe,
      classes: {
        details: "hidden",
        edit: "hidden"
      }
    });
  }
}
class Messages extends Component {
  render() {
    if (this.props.messages) {
      return (
        <div>
          {this.props.messages.map(function(item, index){
            return <p key={index}>{item}</p>
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
class RenderNames extends Component {
  render() {
    return (
      <div>
        {this.props.allRecipes.map((recipe, index) => {
          return <button id={index} key={index} onClick={this.props.action}>{recipe.name}</button>;
        })}
      </div>
    );
  }
}
class RecipeDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let recipe = this.props.recipe;
    return (
      <div>
        <div className={"backdrop " + this.props.show} onClick={this.props.toggle}></div>
        <div className={"modal " + this.props.show}>
          <div className="wrap">
            <button className="modal-close" onClick={this.props.toggle}>&#215;</button>
          </div>
          <h1>{recipe.name}</h1>
          <div className="recipe">
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
              <tbody>
                {recipe.instructions.map((item, index) => {
                  return (
                      <tr key={index}>
                        <td width='50px'>{(index + 1) + '.'}</td>
                        <td>{item}</td>
                      </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button id="show-editor" onClick={this.props.edit}>Edit this recipe</button>
            <button id={recipe.name} onClick={this.props.deleteRecipe}>Delete this recipe</button>
          </div>
        </div>
      </div>
    );
  }
}
class EditRecipe extends Component {
  constructor() {
    super();
    this.state = emptyRecipe;
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props', nextProps.recipe);
    this.setState(nextProps.recipe);
  }
  render() {
    let contents = (
      <table className="row">
        <tbody>
          <tr>
            <td className="left"><label>Name:</label></td>
            <td colSpan="3"><input type="text" id="name" defaultValue={this.state.name} onChange={this.update}/></td>
          </tr>
          <tr><td><br/></td></tr>
          <tr>
            <td className="left"><label>Ingredients:</label></td>
          </tr>
          <tr>
            <td/>
            <td className="center" width="200">name</td>
            <td className="center">qty</td>
            <td className="center">unit</td>
          </tr>
          <this.renderIng />
          <tr><td><br/></td></tr>
          <tr>
            <td className="left"><label>Instructions:</label></td>
          </tr>
          <this.renderIns />
        </tbody>
      </table>
    );
    //un-render table while hidden - necessary to ensure all content changes are captured
    if (this.props.classes === "hidden") {contents = null;}
    return (
      <div>
        <div className={"backdrop " + this.props.classes} onClick={this.reset}></div>
        <form className={"modal " + this.props.classes} id="editForm" action="javascript:void(0);" onSubmit={this.submit}>
          <div className="wrap">
            <button className="modal-close" onClick={this.reset}>&#215;</button>
          </div>
          <h1>Recipe Editor</h1>
          <h3>Type in your recipe below and hit submit!</h3>
          {contents}
          <div className="center">
            <button className='btn-small' type="button" onClick={this.addIng}>More Ingredients</button>
            <button className='btn-small' type="button" onClick={this.addIns}>More Instructions</button>
          </div>
          <div className="modal-footer">
            <input className='btn btn-submit' type="submit" value="submit"/>
          </div>
        </form>
      </div>
    );
  }
  update = () => {
    let ing = [];
    this.state.ingredients.forEach((item, index) => {
      let num = index + 1;
      ing.push([
        document.getElementById('ing-name-'+ num).value,
        document.getElementById('ing-qty-'+ num).value,
        document.getElementById('ing-unit-'+ num).value
      ])
    });
    let ins = [];
    this.state.instructions.forEach((item, index) => {
      let num = index + 1;
      ins.push(document.getElementById('ins-'+ num).value);
    });
    this.setState({
      name: document.getElementById('name').value,
      ingredients: ing,
      instructions: ins
    })
  }
  submit = () => {
    //eliminate empty lines in ingredients and instructions
    let i = 0, j = 0;
    let recipe = this.state;
    console.log("pre-submit", recipe);
    do {
      i = recipe.ingredients.findIndex((item) => {
          return item[0] === '';
      });
      if (i > -1) {
        recipe.ingredients.splice(i, 1);
      }
    } while (i > -1);

    do {
      j = recipe.instructions.findIndex((item) => {
        return item === '';
      });
      if (j > -1) {
        recipe.instructions.splice(j, 1);
      }
    } while (j > -1);
    console.log("submit", recipe)
    this.props.submit(recipe);
    this.setState(emptyRecipe);
    this.props.toggle();
  }
  reset = (e) => {
    e.preventDefault();
    this.setState(emptyRecipe);
    this.props.toggle();
  }
  renderIng = () => {
    let arr = [];
    this.state.ingredients.forEach((item, index) => {
      arr.push(
        <tr key={"ing-" + (index+1)}>
          <td className="right"><label>{(index+1)+":"}</label></td>
          <td><input type="text" id={"ing-name-" + (index+1)} defaultValue={item[0]} onChange={this.update}/></td>
          <td><input type="text" id={"ing-qty-" + (index+1)} defaultValue={item[1]} onChange={this.update}/></td>
          <td><input type="text" id={"ing-unit-" + (index+1)} defaultValue={item[2]} onChange={this.update}/></td>
        </tr>
      );
    });
    return arr;
  }
  renderIns = () => {
    let arr = [];
    this.state.instructions.forEach((item, index) => {
      arr.push(
        <tr key={"ins-"+(index+1)}>
          <td className="right"><label>{(index+1) + ":"}</label></td>
          <td colSpan="3"><input type="text" id={"ins-" + (index+1)} defaultValue={item} onChange={this.update}/></td>
        </tr>
      );
    });
    return arr;
  }
  addIng = () => {
    let arr = this.state.ingredients;
    arr.push( ['', '', ''] );
    this.setState({
      ingredients: arr
    });
  }
  addIns = () => {
    let arr = this.state.instructions;
    arr.push( '' );
    this.setState({
      instructions: arr
    });
  }
}

export default Parent;
