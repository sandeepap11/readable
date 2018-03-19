import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPost from './ListPost';
import Post from './Post';
import '../App.css';

class App extends Component {

  render() {

    return (


      <div className="app">
        <Route exact path='/' render={

          () => (<ListPost />)

        } />

        <Route exact path='/category/:category' component={ListPost} />
        <Route exact path='/category/:category/post/:postId' component={Post} />

      </div>
    )

  }
}

export default App;
