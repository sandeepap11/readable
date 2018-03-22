import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PostView from './PostView';
import { fetchPostById, addNewComment, voteForPost } from '../actions';
import * as PostUtils from '../utils/PostUtils';

class Post extends Component {


    componentDidMount() {
        let postId = "";
    
        postId = this.props.match.params.postId;
        this.props.fetchPost(postId);
    
        Modal.setAppElement('body');

    
      }

      

      componentWillReceiveProps(nextProps){
        console.log("Received next in WillReceive in Posts. Props next.");
        
        console.log(nextProps);
        
      }

      submitComment = (comment, postId) => {

  
        comment["timestamp"] = (new Date()).getTime();
        comment["id"] = PostUtils.getUUID();
        comment["voteScore"] = 1;
        comment["parentId"] = postId;
    
        console.log(comment);
        this.props.newComment(comment);
    
      }
    

      
    render() {
      console.log("Rendering Post...");
      
        console.log(this.props.posts);
        
         const {posts} = this.props;
         const {postId} = this.props.match.params;
       
        

        return (
            
            <div className="posts">
                {posts[postId] !== undefined && posts[postId].comments !== undefined && <PostView post={ posts[postId] } showComments={ true } submitComment={this.submitComment}/>}
            </div>

        )
    };
}

function mapStateToProps({ posts }) {
    console.log("map state", posts);
    let postValue = {};
  
    if(posts.posts !== undefined)
    postValue = posts.posts;
   
console.log("from maps Post", {posts: postValue});

    return {posts: postValue};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchPost: (data) => {
        dispatch(fetchPostById(data))
      },
      newComment: (data) => {
        dispatch(addNewComment(data))
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);