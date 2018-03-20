import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import PostView from './PostView';
import * as ReadableAPI from '../utils/ReadableAPI';
import serializeForm from 'form-serialize';
import capitalize from 'capitalize';
import * as PostUtils from '../utils/PostUtils';
import { setCategory, fetchAllPosts, fetchPostsForCategory, addNewPost, fetchCategories } from '../actions';
import '../App.css';

class ListPost extends Component {

  state = {
    addPostsModalOpen: false,
    categories: [],
    sorter: {
      ascending: false,
      timestamp: true
    }
  };

  openAddPostsModal = () => {
    this.setState({
      addPostsModalOpen: true
    });
  }
  closeAddPostsModalOpen = () => {
    this.setState({
      addPostsModalOpen: false
    });

  }

  submitPost = (e) => {

    e.preventDefault();
    const post = serializeForm(e.target, {
      hash: true
    });

    post["timestamp"] = (new Date()).getTime();
    post["id"] = PostUtils.getUUID();
    post["voteScore"] = 1;
    post["commentCount"] = 0;



    if (this.props.categories.category !== undefined) {
      console.log("Gettin");
      post["category"] = this.props.categories.category;

    }

    console.log(post);


    this.props.newPost(post);
    this.setState({
      addPostsModalOpen: false
    });



  }

  sortSelect = (target) => {
    const selector = target.value.split("-");
    let ascending = true,
      timestamp = true;

    console.log(selector);
    if (selector[0] === "false")
      ascending = false;

    if (selector[1] === "false")
      timestamp = false;

    this.setState({
      sorter: {
        ascending: ascending,
        timestamp: timestamp
      }
    });
    console.log(this.state.sorter);
  }




  componentDidMount() {

    console.log("In mount");
    

    Modal.setAppElement('body');
    
    let selectedCategory = "all";

    if (this.props.match !== undefined) {
      
      selectedCategory = this.props.match.params.category;
    }
   
    console.log("Running  Mount from List");
    if (selectedCategory === "all") {
      this.props.fetchPosts();
    } else {
      this.props.fetchCategoryPosts(selectedCategory);
    };

    this.props.setSelectedCategory(selectedCategory);
  
  }

  componentWillReceiveProps(nextProps) {

    console.log("Will Receive Posts");

    if (nextProps.match !== undefined && this.props.match.params.category !== nextProps.match.params.category) {

      let selectedCategory = "all";
      selectedCategory = nextProps.match.params.category;
    

    console.log("Running  Mount from List");
    if (selectedCategory === "all") {
      nextProps.fetchPosts();
    } else {
      nextProps.fetchCategoryPosts(selectedCategory);
    }
    nextProps.setSelectedCategory(selectedCategory);

  } 
  
  }

  


  render() {
    console.log("WillRender");
    
    
    
    const { addPostsModalOpen, sorter } = this.state;
    const { posts, categories } = this.props;
    let selectedCategory = "all";

    console.log(posts);


    if (this.props.match !== undefined)
      selectedCategory = this.props.match.params.category;
      if (categories.category !== undefined){
        selectedCategory = categories.category;
      }

    console.log("from render", selectedCategory);
    let sortedPosts = [];
    if (posts.posts !== undefined) {
      sortedPosts = posts.posts.sort((a, b) => (b.timestamp - a.timestamp));
      if (!sorter.timestamp) {
        if (sorter.ascending) {
          sortedPosts = posts.posts.sort((a, b) => (a.voteScore - b.voteScore));
        } else {
          sortedPosts = posts.posts.sort((a, b) => (b.voteScore - a.voteScore));
        }
      } else if (sorter.ascending) {
        sortedPosts = posts.posts.sort((a, b) => (a.timestamp - b.timestamp));
      }


    }

    return (<div>
      
      <div className="posts" >
        <button className="btn-add-post"
          onClick={
            this.openAddPostsModal
          } > New Post </button> <div className="posts-header" >
          <h1 className="posts-heading" > {
            capitalize.words(`${selectedCategory} posts`)
          } </h1>
          <div className="posts-sort" >
            Sort By < select onChange={
              (event) => this.sortSelect(event.target)
            }>
              <option value="false-true" > Newest First </option>
              <option value="true-true" > Oldest First </option>
              <option value="false-false" > Most Popular First </option>
              <option value="true-false" > Least Popular First </option>

            </select>
          </div >
        </div>

        {
          sortedPosts !== undefined && <ul > {
            sortedPosts.map(post => (< li className="posts-list"
              key={post.id} >
              <PostView post={ post } showComments={ false }/>
            </li>))}

          </ul>} </div >


      <Modal className="modal"
        overlayClassName="overlay"
        isOpen={addPostsModalOpen}
        onRequestClose={this.closeAddPostsModalOpen}
        contentLabel="Modal" >
        {addPostsModalOpen &&
          <div>
            <button className="modal-close"
              onClick={this.closeAddPostsModalOpen} >
            </button>
            <h1 className="posts-heading" > New Post </h1>
            <form onSubmit={this.submitPost} >
              <input type="text" name="title" placeholder="Enter Title" required />
              <input type="text" name="author" placeholder="Enter Username" required />
              {selectedCategory === "all" &&
                <select name="category" >
                  {
                    categories.categories.map((category) => (<option value={category.name} key={category.name}>
                      {capitalize.words(category.name)} </option>))
                  }
                </select>}
              <textarea name="body" placeholder="Write something" required />
              <button> Post </button>
            </form>
          </div>
        } </Modal> </div>);

  };
}

function mapStateToProps({ posts, categories }) {
  
  return { posts,
  categories };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => {
      dispatch(fetchAllPosts());
    },
    fetchCategoryPosts: (data) => {
      dispatch(fetchPostsForCategory(data));
    },
    newPost: (data) => {
      dispatch(addNewPost(data));
    },
    setSelectedCategory: (data) => {
      dispatch(setCategory(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListPost);