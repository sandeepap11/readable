import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import '../App.css';

class App extends Component {

  render() {

    return (

      
      <div className="app">
			<Route exact path='/' render={

				() => (	<Home/> )

			}/>

			<Route path='/category' render={

				() => (<Category/>)
			}/>

		  </div>
    )
    
  }
}

export default App;
