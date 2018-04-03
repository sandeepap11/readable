import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import capitalize from 'capitalize';
import PostView from './PostView';
import { setCategory, fetchAllPosts, fetchPostsForCategory, addNewPost } from '../actions';
import * as PostUtils from '../utils/PostUtils';
import '../App.css';

class ListPost extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired
  };

  state = {
    addPostsModalOpen: false,
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

  };

  changedPost = () => {

    if (this.title.value === "" || this.author.value === "" || this.body.value === "") {
      this.button.disabled = true;
    }
    else {
      this.button.disabled = false;
    }

  };

  submitPost = (e) => {

    e.preventDefault();
    const post = serializeForm(e.target, {
      hash: true
    });

    post["timestamp"] = (new Date()).getTime();
    post["id"] = PostUtils.getUUID();
    post["voteScore"] = 1;
    post["commentCount"] = 0;

    if (this.props.category !== "all")
      post["category"] = this.props.category;

    this.props.newPost(post);
    this.closeAddPostsModalOpen();
  };

  sortSelect = (target) => {
    const selector = target.value.split("-");
    let ascending = true,
      timestamp = true;

    if (selector[0] === "false")
      ascending = false;

    if (selector[1] === "false")
      timestamp = false;

    this.setState({
      sorter: {
        ascending,
        timestamp
      }
    });
  };

  componentDidMount() {


    Modal.setAppElement('body');

    let selectedCategory = "all";

    if (this.props.match !== undefined) {

      selectedCategory = this.props.match.params.category;
    }

    if (selectedCategory === "all") {
      this.props.fetchPosts();
    } else {
      this.props.fetchCategoryPosts(selectedCategory);
    };

    this.props.setSelectedCategory(selectedCategory);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.match !== undefined && this.props.match.params.category !== nextProps.match.params.category) {

      let selectedCategory = "all";
      selectedCategory = nextProps.match.params.category;

      if (selectedCategory === "all") {
        nextProps.fetchPosts();
      } else {
        nextProps.fetchCategoryPosts(selectedCategory);
      }
      nextProps.setSelectedCategory(selectedCategory);

    }

  }


  sortPosts = (postsToSort) => {

    const { sorter } = this.state;

    if (!sorter.timestamp) {
      if (sorter.ascending) {
        return postsToSort.sort((firstPost, nextPost) => (firstPost.voteScore - nextPost.voteScore));
      }
      else {
        return postsToSort.sort((firstPost, nextPost) => (nextPost.voteScore - firstPost.voteScore));
      }
    }
    else {
      if (sorter.ascending) {
        return postsToSort.sort((firstPost, nextPost) => (firstPost.timestamp - nextPost.timestamp));
      }
      else {
        return postsToSort.sort((firstPost, nextPost) => (nextPost.timestamp - firstPost.timestamp));
      }
    }
  };

  render() {

    const { addPostsModalOpen } = this.state;
    const { posts, categories, category, loaded } = this.props;

    let sortedPosts = [];

    if (Object.keys(posts).length > 0) {
      sortedPosts = Object.keys(posts).forEach((key, value) => value);
      sortedPosts = Object.values(posts);

      sortedPosts = this.sortPosts(sortedPosts);

    }

    return (
      <div>
        {!loaded && <ReactLoading delay={100} type="bars" color="rebeccapurple" className='loading' />}
        <button className="btn-add-post" onClick={this.openAddPostsModal} > New Post </button>
        {
          (loaded && sortedPosts.filter((post) => !post.deleted).length === 0 ) &&
          <div className="no-results">
            <p>No posts available <span onClick={this.openAddPostsModal}>Click to add a post!</span></p>
          </div>
        }
        {
          (loaded && sortedPosts.filter((post) => !post.deleted).length !== 0) && <div className="posts" >
            <div className="posts-header" >
              <h1 className="posts-heading" > {capitalize.words(`${category} posts`)} </h1>
              {
                (sortedPosts.filter((post) => !post.deleted).length !== 0) &&
                <div className="posts-sort" >
                  <select onChange={(event) => this.sortSelect(event.target)}>
                    <option value="false-true" > Newest First </option>
                    <option value="true-true" > Oldest First </option>
                    <option value="false-false" > Most Popular First </option>
                    <option value="true-false" > Least Popular First </option>
                  </select>
                </div >
              }
            </div>

            {
              (sortedPosts.length !== 0) &&
              <ul >
                {
                  sortedPosts.map(post => (< li className="posts-list"
                    key={post.id} >
                    <PostView post={post} showComments={false} />
                  </li>))
                }

              </ul>
            }
          </div>
        }


        <Modal className="modal"
          overlayClassName="overlay"
          isOpen={addPostsModalOpen}
          onRequestClose={this.closeAddPostsModalOpen}
          contentLabel="Modal" >
          {
            addPostsModalOpen &&
            <div>
              <button className="modal-close"
                onClick={this.closeAddPostsModalOpen} >
              </button>
              <h1 className="modal-heading" > New {category === "all" ? "" : `${capitalize(category)} `}Post </h1>
              <form onSubmit={this.submitPost} >
                <input type="text" ref={(title) => this.title = title} onChange={() => this.changedPost()} name="title" placeholder="Enter Title" required />
                <input type="text" ref={(author) => this.author = author} onChange={() => this.changedPost()} name="author" placeholder="Enter Username" required />
                {category === "all" &&
                  <select name="category" >
                    {
                      categories.map((thisCategory) => (<option value={thisCategory} key={thisCategory}>
                        {capitalize.words(thisCategory)} </option>))
                    }
                  </select>}
                <textarea name="body" ref={(body) => this.body = body} onChange={() => this.changedPost()} placeholder="Write something ..." required />
                <button disabled name="body" ref={(button) => this.button = button}> Post </button>
              </form>
            </div>
          }
        </Modal>
      </div>
    );

  };
}

function mapStateToProps({ posts, categories }) {
  let postList = { "id": "teller" }, categoryList = [], category = "", loaded = false;

  if (categories.categories !== undefined) {
    categoryList = categories.categories.reduce((result, category) => {
      result.push(category.name);
      return result;
    }, []);
  }

  if (posts.posts !== undefined) {

    postList = posts.posts;
    loaded = true;
  }

  if (categories.category !== undefined) {
    category = categories.category;
  }

  return {
    posts: postList, categories: categoryList, category, loaded
  };
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