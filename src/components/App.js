import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPost from './ListPost';
import '../App.css';

class App extends Component {

  render() {

    return (


      <div className="app">
        <Route exact path='/' render={

          () => (<ListPost />)

        } />

        <Route exact path='/category/:category' component={ListPost} />

      </div>
    )

  }
}

export default App;
