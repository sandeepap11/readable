import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import '../App.css';

class Category extends Component {

    state = {
        posts : [], loading: true
   
     };
   
     componentWillMount(){
       ReadableAPI.getCategoryPosts('redux').then(
         (posts) => {
       
           this.setState({ posts, loading: false });
           
         })
     }

    render(){

        console.log(this.state.posts);

        return(
            <div>
           <h1> Koi posts hain!</h1>

           <ul>
          {
            this.state.posts.map(posts => (<li key={ posts.id }>{ posts.title } </li>))
          }
          
        </ul>
        </div>

        );


    }
}

export default Category;
