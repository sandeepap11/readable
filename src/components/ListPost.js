import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import capitalize  from 'capitalize';
import * as PostUtils from '../utils/PostUtils';
import { fetchAllPosts, fetchPostsForCategory, addNewPost } from '../actions';
import '../App.css';

class ListPost extends Component {

  state = {
    addPostsModalOpen : false,
    categories : [],
    sorter : {ascending: false, timestamp: true}
  };

 openAddPostsModal = () => {
   this.setState({addPostsModalOpen: true});
 }
  closeAddPostsModalOpen = () => {
     this.setState({addPostsModalOpen: false});

  }

  submitPost = (e) => {
    const {selectedCategory} = this.props;

		e.preventDefault();
		const post = serializeForm(e.target, {hash:true});

    post["timestamp"] = (new Date()).getTime();
    post["id"] = PostUtils.getUUID();
    post["voteScore"] = 1;
    post["commentCount"] = 0;

    if(selectedCategory !== "all"){
      post["category"] = selectedCategory;
    }

		console.log(post);


  this.props.newPost(post);
    this.setState({addPostsModalOpen: false});



	}

  sortSelect = (target) => {
    const selector = target.value.split("-");
    let ascending = true, timestamp = true;

    console.log(selector);
    if(selector[0] === "false")
    ascending = false;

    if(selector[1] === "false")
    timestamp = false;

    this.setState({sorter : {ascending: ascending, timestamp: timestamp}});
    console.log(this.state.sorter);
  }

     componentDidMount(){
       const {selectedCategory} = this.props;

 Modal.setAppElement('body');

 ReadableAPI.getCategories().then(
   (categories) => {

     this.setState({ categories });

   })

      if(selectedCategory === "all"){
        this.props.fetchPosts();
      }
       else {
         this.props.fetchCategoryPosts(selectedCategory);
       }

     }


    render(){
      const { categories, addPostsModalOpen, sorter } = this.state;
      const { posts, selectedCategory } = this.props;

      console.log("from render");
      let sortedPosts = [];
      if(posts.posts !== undefined ){
        sortedPosts = posts.posts.sort((a, b) => (b.timestamp - a.timestamp));
        if(!sorter.timestamp){
          if(sorter.ascending){
            sortedPosts = posts.posts.sort((a, b) => (a.voteScore - b.voteScore));
          }
          else{
            sortedPosts = posts.posts.sort((a, b) => (b.voteScore - a.voteScore));
          }
        }
        else if(sorter.ascending){
          sortedPosts = posts.posts.sort((a, b) => (a.timestamp - b.timestamp));
        }


      }

        return(
            <div>
            <h1 className="title">READABLE!</h1>

            <div className="categories">


              <h3>CATEGORIES</h3>
              <div className="categories-list">

            {<ul>
                {
                  categories.map(
                    category =>
                    (
                      (selectedCategory === category.name && <li className="selected-category" key={ category.name }>{ capitalize.words(category.name) } </li>) ||

                      (selectedCategory !== category.name && <li key={ category.name }>{ capitalize.words(category.name) } </li>)
                    )
                  )

                }



              </ul>}
              </div>

            </div>

            <div className="posts">
            <button className="btn-add-post" onClick={this.openAddPostsModal}>New Post </button>
           <div className="posts-header">
            <h1 className="posts-heading"> {capitalize.words(`${selectedCategory} posts`)}</h1>
            <div className="posts-sort">
              Sort By <select onChange={(event) => this.sortSelect(event.target)}>
              <option value="false-true">Newest First</option>
                <option value="true-true">Oldest First</option>
                <option value="false-false">Most Popular First</option>
                <option value="true-false">Least Popular First</option>

              </select>
            </div>
          </div>

        {sortedPosts !== undefined && <ul>
          {
             sortedPosts.map(post => (<li className="posts-list" key={ post.id }>
                <div className="post">
                  <h2>{post.title}</h2>
                  <div className="fine-details">
                    <p>Author:{post.author}</p>
                    <p>Category:{post.category}</p>
                    <p>Posted on: {PostUtils.getDate(post.timestamp)}</p>
                  </div>
                  <div className="post-body">
                    <p>{post.body}</p>
                  </div>
                  <div className="post-counts">
                    <p>Votes: {post.voteScore}</p>
                    <p>Comments: {post.commentCount}</p>
                  </div>

                </div>

               </li>))
          }

        </ul>}
          </div>


        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={addPostsModalOpen}
          onRequestClose={this.closeAddPostsModalOpen}
          contentLabel="Modal"
        >
          {
            addPostsModalOpen &&
            <div>
            <button className="modal-close" onSubmit={this.closeAddPostsModalOpen}>></button>
            <h1 className="posts-heading">New Post</h1>
            <form onSubmit={this.submitPost}>
              <input type="text" name="title" placeholder="Enter Title" required/>
              <input type="text" name="author" placeholder="Enter Username" required/>
              <textarea name="body" placeholder="Write something" required/>
              {selectedCategory === "all" && <select name="category">
                {
                  categories.map(
                  (category) =>
                  (
                    <option id= {category} value={category} >{capitalize.words(category.name)}</option>
                  )
                )

                }

              </select>}
              <button>Post</button>
            </form>
            </div>
          }
        </Modal>
        </div>

        );


    }
}

function mapStateToProps ( {posts} ){


  return{

  posts

  }
  }

function mapDispatchToProps(dispatch){

  return {

    fetchPosts: () => { dispatch(fetchAllPosts()) },
    fetchCategoryPosts: (data) => { dispatch(fetchPostsForCategory(data)) },
    newPost: (data) => { dispatch(addNewPost(data)) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
