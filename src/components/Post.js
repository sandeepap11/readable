import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PostView from './PostView';
import { fetchPostById } from '../actions';

class Post extends Component {

  componentDidMount() {
    let postId = "";

    postId = this.props.match.params.postId;
    this.props.fetchPost(postId);

    Modal.setAppElement('body');

  }

  render() {

    const { posts } = this.props;
    const { postId } = this.props.match.params;

    return (

      <div className="posts">
        {posts[postId] !== undefined && posts[postId].comments !== undefined && <PostView post={posts[postId]} showComments={true} />}
      </div>

    )
  };
}

function mapStateToProps({ posts }) {

  let postValue = {};

  if (posts.posts !== undefined)
    postValue = posts.posts;

  return { posts: postValue };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => {
      dispatch(fetchPostById(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);