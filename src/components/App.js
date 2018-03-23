import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigator from './Navigator';
import ListPost from './ListPost';
import Post from './Post';
import '../App.css';

class App extends Component {

  render() {

    return (

      <div className="app">
        <Navigator />


        <Route exact path='/' render={

          () => (<ListPost />)

        } />

        <Route exact path='/category/:category' component={ListPost} />
        <Route exact path='/post/:postId' component={Post} />

      </div>
    )

  }
}

export default App;
