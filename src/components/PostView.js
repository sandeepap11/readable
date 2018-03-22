import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import capitalize from 'capitalize';
import { voteForPost, voteForComment, addNewComment } from '../actions';
import * as PostUtils from '../utils/PostUtils';

class PostView extends Component {

    submitComment = (e, postId) => {

        e.preventDefault();
        const comment = serializeForm(e.target, {
            hash: true
        });

        e.target.reset();

        comment["timestamp"] = (new Date()).getTime();
        comment["id"] = PostUtils.getUUID();
        comment["voteScore"] = 1;
        comment["parentId"] = postId;
        this.props.newComment(comment);

    }

votePost = (postId, option) => {

    this.props.postVote(postId, option);

}

voteComment = (commentId, option) => {
    this.props.commentVote(commentId, option);

}

render() {
    const { post, showComments, comments } = this.props;

    return (

        <div>
            {(<div className="post" >
                {showComments ? (<h2 > {post.title} </h2>)
                    : (<Link to={`/category/${post.category}/post/${post.id}`}><h2> {post.title} </h2></Link>)}
                <div className="fine-details">
                    <p> {post.author} </p>
                    <p> {capitalize(post.category)} </p>
                    <p>  {PostUtils.getDate(post.timestamp)} </p>
                </div>
                <div className="post-body" >
                    <p > {post.body} </p>
                </div>
                <div className="post-counts" >
                    <div className="votes"><div className="upvote" onClick={() => { this.votePost(post.id, "upVote") }}></div> <div className="downvote" onClick={() => { this.votePost(post.id, "downVote") }}></div>
                        <p>{post.voteScore} </p></div>
                    <div className="votes"><div className="comments"></div>
                        <p> {post.commentCount} </p></div>
                </div>
                {(showComments) && (post.commentCount > 0) && (post.comments.length > 0) && <div className="comments-section">
                    <h5>COMMENTS</h5>

                    {post.comments.map((comment) => (

                        <li className="comment" key={comment}>
                            <div className="fine-comment-details">
                                <p> {comments[comment].author} </p>
                                <p> {PostUtils.getDate(comments[comment].timestamp)} </p>
                            </div>
                            <div className="comment-body" >
                                <p > {comments[comment].body} </p>
                            </div>
                            <div className="comment-counts" >
                                <div className="votes">
                                    <div className="upvote" onClick={() => { this.voteComment(comment, "upVote") }} ></div>
                                    <div className="downvote" onClick={() => { this.voteComment(comment, "downVote") }}></div>
                                    <p>{comments[comment].voteScore} </p></div>
                            </div>

                        </li>))}
                </div>
                }
                {(showComments) && (
                    <form className="add-comment" onSubmit={(event) => { this.submitComment(event, post.id) }} >
                        <textarea name="body" placeholder="Write a comment ..." required></textarea>
                        <div>
                            <input type="text" name="author" placeholder="Enter Username" required />
                            <button className="submit-comment">Submit</button>
                        </div>
                    </form>
                )}
            </div>)}

        </div>);

}
}


function mapStateToProps({ posts }) {

    let postValue = {}, commentValue = {};

    if (posts.posts !== undefined)
        postValue = posts.posts;

    if (posts.comments !== undefined)
        commentValue = posts.comments;

    return { posts: postValue, comments: commentValue };
}

function mapDispatchToProps(dispatch) {
    return {
        postVote: (data, option) => {
            dispatch(voteForPost(data, option))
        },
        commentVote: (data, option) => {
            dispatch(voteForComment(data, option))
        },
        newComment: (data) => {
          dispatch(addNewComment(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);