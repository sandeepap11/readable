import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PostView from './PostView';
import { fetchPostById, addNewComment } from '../actions';
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
      console.log("Rendering ...");
      
        console.log(this.props.posts);
        
         const {post} = this.props.posts;
       console.log(post);
       
        

        return (
            
            <div>
                <PostView post={ post } showComments={ true } submitComment={this.submitComment}/>
            </div>

        )
    };
}

function mapStateToProps({ posts }) {
    console.log("map state");
    
  
    return { posts };
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