import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import * as UUIDGenerator from '../utils/UUIDGenerator';
import { fetchPostsForCategory } from '../actions';
import '../App.css';

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
		const values = serializeForm(e.target, {hash:true});

    values["timestamp"] = (new Date()).getTime();
    values["id"] = UUIDGenerator.getUUID();

		console.log(values);


  ReadableAPI.createPost(values).then((body) =>{
    console.log(body);
    this.setState({addPostsModalOpen: false});
    }
  );



	}

     componentDidMount(){

 Modal.setAppElement('body');

       this.props.fetchPosts('redux');
       console.log(this.props.posts);
     }

    render(){
      const { addPostsModalOpen } = this.state;
      const { posts } = this.props

      console.log("from render");
        console.log(posts.posts);
        let allPosts = posts.posts;


        return(
            <div>

            <button onClick={this.openAddPostsModal}>Naya Post </button>
           <h1> Koi posts hain!</h1>

        {allPosts !== undefined && <ul>
          {
             allPosts.map(post => (<li key={ post.id }>
                <div>
                  <h3>{post.title}</h3>
                  <h4>{post.author}</h4>
                  <p>{post.body}</p>
                  <p>{post.voteScore}</p>
                  <p>{post.commentCount}</p>
                  <p>{post.category}</p>
                  <p>{allPosts.length}</p>
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

    fetchPosts: (data) => { dispatch(fetchPostsForCategory(data)) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
