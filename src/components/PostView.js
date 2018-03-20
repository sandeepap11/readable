import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import * as PostUtils from '../utils/PostUtils';

class PostView extends Component {


    submitComment = (e, postId) => {

        e.preventDefault();
        const comment = serializeForm(e.target, {
          hash: true
        });

       
        e.target.reset();        

       this.props.submitComment(comment, postId);
    }

    render() {
        const {post, showComments} = this.props;


    return(
        
            <div>
            {(post !== undefined) && ( <div className="post" >
            {showComments ? (<h2 > {post.title} </h2>) 
                            : (<Link to={`/category/${post.category}/post/${post.id}`}><h2> {post.title} </h2></Link>)}
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
                        { (showComments) && (post.commentCount > 0) && (post.comments.length > 0) && <div className="comments-section">
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
                                
                                </li>))}
                                </div>
                                }
                                { (showComments) && (
                                <form className="add-comment" onSubmit={(event) => {this.submitComment(event, post.id)}} >
                                <textarea name="body" placeholder="Write a comment ..." required></textarea>
                                <div>
                                <input type="text" name="author" placeholder="Enter Username" required />
                                <button className="submit-comment">Submit</button>
                                </div>
                                </form>
                                )}
                        </div> )}

            </div>);

                }
            }

            export default PostView;