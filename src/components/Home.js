import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import * as UUIDGenerator from '../utils/UUIDGenerator';
import { fetchAllPosts, addNewPost } from '../actions';
import '../App.css';

class Home extends Component {

  state = {
    addPostsModalOpen : false,
    categories : []
  };

 openAddPostsModal = () => {
   this.setState({addPostsModalOpen: true});
 }
  closeAddPostsModalOpen = () => {
     this.setState({addPostsModalOpen: false});

  }

  submitPost = (e) => {

		e.preventDefault();
		const post = serializeForm(e.target, {hash:true});

    post["timestamp"] = (new Date()).getTime();
    post["id"] = UUIDGenerator.getUUID();

		console.log(post);


  this.props.newPost(post);
    this.setState({addPostsModalOpen: false});



	}

     componentDidMount(){

 Modal.setAppElement('body');

 ReadableAPI.getCategories().then(
   (categories) => {

     this.setState({ categories });

   })

       this.props.fetchPosts();
       console.log(this.props.posts);
     }


    render(){
      const { addPostsModalOpen } = this.state;
      const { posts } = this.props;

      console.log("from render");
        console.log(posts.posts);


        return(
            <div>

            <div className="categories-list">

              <h1>THIS IS READABLE!</h1>
              <h2>Here are the categories, choose one, add a post or view all posts below.</h2>
              { this.state.loading && <img alt='Hamra nazariya'/> }
              <ul>
                {
                  this.state.categories.map(category => (<li key={ category.name }>{ category.name } </li>))
                }

              </ul>

            </div>

            <button onClick={this.openAddPostsModal}>Naya Post </button>
           <h1> Here are all the posts!</h1>

        {posts.posts !== undefined && <ul>
          {
             posts.posts.map(post => (<li key={ post.id }>
                <div>
                  <h3>{post.title}</h3>
                  <h4>{post.author}</h4>
                  <p>{post.body}</p>
                  <p>{post.voteScore}</p>
                  <p>{post.commentCount}</p>
                  <p>{post.category}</p>
                </div>

               </li>))
          }

        </ul>}


        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addPostsModalOpen}
          onRequestClose={this.closeAddPostsModalOpen}
          contentLabel='Modal'
        >
          {
            addPostsModalOpen &&
            <form onSubmit={this.submitPost}>
              <input type="text" name="title" placeholder="Enter Title"/><br/>
              <input type="text" name="author" placeholder="Enter Username"/><br/>
              <textarea name="body" placeholder="Write something"/><br/>
              <select name="category">
                <option value="redux" >Redux</option>
                <option value="react" >React</option>
              </select>
              <button>Post</button>
            </form>
          }
        </Modal>
        </div>

        );


    }
}

function mapStateToProps ( {posts} ){
  console.log("mapping");
  console.log(posts);
  console.log("mapping");

  return{

  posts

  }
  }

function mapDispatchToProps(dispatch){

  return {

    fetchPosts: () => { dispatch(fetchAllPosts()) },
    newPost: (data) => { dispatch(addNewPost(data)) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
