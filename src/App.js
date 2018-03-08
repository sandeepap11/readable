import React, { Component } from 'react';
import * as ReadableAPI from './utils/ReadableAPI'
import './App.css';

class App extends Component {

  getCategories = () => {

  }

  render() {

    // const body = {"id":"8xf0y6ziyjabvozdd253nd","timestamp":1467166872634,"title":"This is the millieu red, orange, yellow, ...","body":"Story of my unsold tickets in master!.","author":"Bandarathilakeshan","category":"Jazz","voteScore":4,"deleted":false,"commentCount":2};



ReadableAPI.deletePost('8xf0y6ziyjabvozdd253nd').then(
  (response) => {console.log(response);}
)

    ReadableAPI.getPosts().then(
      (response) => {console.log(response);}
    )

    return (
      <div className="App">

        <h1>Home of Commenting, welcome or rather, welcome to the home of commenting!</h1>
        <h2>Here are the cats, lol!</h2>


      </div>
    );
  }
}

export default App;
