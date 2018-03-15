import React, { Component } from 'react';
import ListPost from './ListPost'
import '../App.css';

class Home extends Component {

render() {
  return(

    <div>
      <ListPost selectedCategory={"all"}/>
    </div>
  );


}
}

export default Home;
