import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { fetchPostById } from '../actions';
import * as PostUtils from '../utils/PostUtils';
import { comment } from '../utils/ReadableAPI';

class Post extends Component {


    componentDidMount() {
        let postId = "";
    
        postId = this.props.match.params.postId;
        this.props.fetchPost(postId);
    
        Modal.setAppElement('body');

    
      }

    render() {
        console.log(this.props.posts);
        
         const {post} = this.props.posts;
        const {postId} = this.props.match.params;
       console.log(post);
       
        

        return (
            
            <div>
                {(post !== undefined) && ( <div className="post" >
               <h2 > {post.title} </h2>
                <div className="fine-details">
                  <p> Author: {post.author} </p>
                  <p > Category: {post.category} </p>
                  <p> Posted on: {PostUtils.getDate(post.timestamp)} </p>
                </div>
                <div className="post-body" >
                  <p > {post.body} </p>
                </div>
                <div className="post-counts" >
                  <p> Votes: {post.voteScore} </p>
                  <p> Comments: {post.commentCount} </p>
                </div>
               { post.comments.length > 0 && <div className="comments-section">
               <h5>COMMENTS</h5>
               
               {post.comments.map((comment) => (
                   
                    <li className="comment" key={comment.id}>
                        <div className="fine-comment-details">
                    <p> Author: {comment.author} </p>
                    <p> Posted on: {PostUtils.getDate(comment.timestamp)} </p>
                    </div>
                    <div className="comment-body" >
                    <p > {comment.body} </p>
                    </div>
                    <div className="comment-counts" >
                    <p> Votes: {comment.voteScore} </p>
                    </div>
                    <div className="add-comment">
                    <textarea name="addComment" placeholder="Write a comment ..."></textarea>
                    <button className="submit-comment">Submit</button>
                    </div>                   
                    
                    </li>))}
                    </div>
                    }

              </div> )}
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
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);