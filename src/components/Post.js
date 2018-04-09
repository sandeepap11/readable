import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types';
import PostView from './PostView';
import { fetchPostById } from '../actions';
import ErrorPage from './ErrorPage';

class Post extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired
  };

  componentDidMount() {

    const { postId } = this.props.match.params;
    this.props.fetchPost(postId);

    Modal.setAppElement('body');
  }

  render() {

    const { posts, loaded } = this.props;
    const { category, postId } = this.props.match.params;
    

    return (
      <div>
        {!loaded && <ReactLoading delay={100} type="bars" color="rebeccapurple" className="loading" />}
        {loaded && (<div>
          {(posts[postId] === undefined || posts[postId].deleted || posts[postId].category !== category) &&
            <ErrorPage message="The post has been deleted or it does not exist" />}
          <div className="posts">
            {posts[postId] !== undefined && (posts[postId].category === category) && <PostView post={posts[postId]} showComments={true} />}
          </div>
        </div>)}
      </div>)
  };
}

function mapStateToProps({ posts }) {

  let postValue = {}, loaded = false;
 

  if(posts.id !== undefined){
    return {id: posts.id}
  }

  if (posts.posts !== undefined) {
    postValue = posts.posts;
    loaded = true;
  }

  if(posts.message){
    loaded = true;
  }

  return { posts: postValue, loaded };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => {
      dispatch(fetchPostById(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);