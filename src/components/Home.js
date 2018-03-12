import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import '../App.css';

class Home extends Component {

  state = {
     categories : [], loading: true

  };

  componentWillMount(){
    ReadableAPI.getCategories().then(
      (categories) => {
    
        this.setState({ categories, loading: false });
        
      })
  }

  render() {

console.log(this.state.loading);

    return (
      <div className="App">

        <h1>Home of Commenting, welcome or rather, welcome to the home of commenting!</h1>
        <h2>Here are the cats, lol!</h2>
        { this.state.loading && <img alt='Hamra nazariya'/> }
        <ul>
          {
            this.state.categories.map(category => (<li key={ category.name }>{ category.name } </li>))
          }
          
        </ul>

      </div>

      
    );
  }
}

export default Home;
