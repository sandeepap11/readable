import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import * as PostUtils from '../utils/PostUtils';
import { fetchPostsForCategory, addNewPost } from '../actions';
import '../App.css';

// To-DO: Category is hardcoded. change to props.
// Under componentDidMount and in submitPost

class Category extends Component {

  state = {
    addPostsModalOpen : false
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
    post["id"] = PostUtils.getUUID();
    post["category"] = "redux";

		console.log(post);


  this.props.newPost(post);
    this.setState({addPostsModalOpen: false});



	}

     componentDidMount(){

 Modal.setAppElement('body');

       this.props.fetchPosts('redux');
       console.log(this.props.posts);
     }


    render(){
      const { addPostsModalOpen } = this.state;
      const { posts } = this.props;

      console.log("from render");
        console.log(posts.posts);


        return(
            <div>

            <button onClick={this.openAddPostsModal}>Add Post </button>
           <h1> All Posts for this category</h1>

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
              <button>Post</button>
            </form>
          }
        </Modal>
        </div>

        );


    }
}

function mapStateToProps ( {posts} ){
  console.log("Map State To props Pehil baar");


  return{

  posts: posts

  }
  }

function mapDispatchToProps(dispatch){
    console.log("Map Dispatch To props Pehil baar");

  return {

    fetchPosts: (data) => { dispatch(fetchPostsForCategory(data)) },
    newPost: (data) => { dispatch(addNewPost(data)) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
