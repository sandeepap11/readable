import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigator from './Navigator';
import ListPost from './ListPost';
import Post from './Post';
import '../css/App.css';
import ErrorPage from './ErrorPage';

class App extends Component {

  render() {

    return (

      <div className="app">
        <Navigator />
        
        <Route exact path='/' render={() => (<ListPost />)} />
        <Route exact path='/:category' component={ListPost} />
        <Route exact path='/:category/:postId' component={Post} />
        <Route exact path='/*/*/*' component={ErrorPage} />        
      </div>
    )

  }
}

export default App;
