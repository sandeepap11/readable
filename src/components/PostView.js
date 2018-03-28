import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import capitalize from 'capitalize';
import {
    fetchVotePost, fetchVoteComment, fetchAddNewComment,
    fetchUpdatePost, fetchUpdateComment, fetchDeletePost, fetchDeleteComment
} from '../actions';
import * as PostUtils from '../utils/PostUtils';

class PostView extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        showComments: PropTypes.bool,
        comments: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired
    }

    state = {
        editPostModal: false,
        editCommentModal: false,
        commentToEdit: {}
    };

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

    deletePost = (postId) => {
        this.props.removePost(postId);
    }

    deleteComment = (commentId) => {
        this.props.removeComment(commentId);
    }

    changedPost = () => {
        const {post} = this.props;

        if(this.title.value === "" || this.author.value === "" || this.body.value === ""){
            this.button.disabled = true;
        }
        else if((this.title.value !== post.title) || 
            (this.author.value !== post.author) || 
            (this.category.value !== post.category) || 
            (this.body.value !== post.body)){
                this.button.disabled = false;
            }
            else{
                this.button.disabled = true;
            }
        
    }

    submitPost = (e, postId) => {

        e.preventDefault();
        const post = serializeForm(e.target, {
            hash: true
        });

        post["timestamp"] = (new Date()).getTime();


        this.props.editPost(postId, post);
        this.closeEditPostModal();
    }

    openEditPostModal = () => {
        this.setState({ editPostModal: true });
    }

    closeEditPostModal = () => {
        this.setState({
            editPostModal: false
        });
    }

    changedComment = () => {
        const {commentToEdit} = this.state;

        if(this.cAuthor.value === "" || this.cBody.value === ""){
            this.cButton.disabled = true;
        }
        else if((this.cAuthor.value !== commentToEdit.author) || 
            (this.cBody.value !== commentToEdit.body)){
                this.cButton.disabled = false;
            }
            else{
                this.cButton.disabled = true;
            }
        
    }

    submitEditedComment = (e) => {
        
        e.preventDefault();
        const comment = serializeForm(e.target, {
            hash: true
        });

        comment["timestamp"] = (new Date()).getTime();

        this.props.editComment(this.state.commentToEdit.id, comment);
        this.closeEditCommentModal();
    }

    openEditCommentModal = (commentToEdit) => {
        this.setState({ commentToEdit, editCommentModal: true });
        }

    closeEditCommentModal = () => {
        this.setState({
            editCommentModal: false
        });

    }

    newComment = () => {
        
        if(this.nAuthor.value === "" || this.nBody.value === ""){
            this.nButton.disabled = true;
        }
        
            else{
                this.nButton.disabled = false;
            }
        
    }
    

    render() {
        const { post, showComments, comments, category, categories } = this.props;
        const { editPostModal, editCommentModal, commentToEdit } = this.state;

        return (

            <div>
                {(post.deleted === false && <div className="post" >
                    {showComments ? (<h2 className="post-view-header"> {post.title} </h2>)
                        : (<Link to={`/post/${post.id}`}><h2> {post.title} </h2></Link>)}
                    <div className="fine-details">
                        <p> {`@${post.author}`} </p>
                        <p><Link to={`/category/${post.category}`}>{capitalize(post.category)}</Link></p>
                        {showComments ? (<p>{PostUtils.getDate(post.timestamp)}</p>)
                            : (<p><Link to={`/post/${post.id}`}> {PostUtils.getDate(post.timestamp)}</Link></p>)}
                    </div>
                    <div className="post-body" >
                        <p > {post.body} </p>
                    </div>
                    <div className="post-counts" >
                        <div className="votes">
                            <div className="upvote" onClick={() => { this.votePost(post.id, "upVote") }}></div>
                            <p className="vote-value">{post.voteScore} </p>
                            <div className="downvote" onClick={() => { this.votePost(post.id, "downVote") }}></div>
                        </div>

                        <div className="votes">
                            {showComments ? (<div className="comments"></div>)
                                : (<Link to={`/post/${post.id}#comment`}><div className="comments"></div></Link>)}
                            <p> {post.commentCount} </p>
                        </div>
                        <div className="edit-item" onClick={this.openEditPostModal}></div>
                        <div className="delete-item" onClick={() => this.deletePost(post.id)}></div>
                    </div>
                    {(showComments) && (post.commentCount > 0) && (post.comments.length > 0) && <div className="comments-section">
                        <h5>{capitalize("comments")}</h5>

                        {post.comments.filter((comment) => comments[comment].deleted === false).map((comment) => (

                            <li className="comment" key={comment}>
                                <div className="fine-comment-details">
                                    <p> {`@${comments[comment].author}`} </p>
                                    <p> {PostUtils.getDate(comments[comment].timestamp)} </p>
                                </div>
                                <div className="comment-body" >
                                    <p > {comments[comment].body} </p>
                                </div>
                                <div className="comment-counts" >
                                    <div className="votes">
                                        <div className="upvote" onClick={() => { this.voteComment(comment, "upVote") }} ></div>
                                        <p className="vote-value">{comments[comment].voteScore} </p>
                                        <div className="downvote" onClick={() => { this.voteComment(comment, "downVote") }}></div>
                                    </div>
                                    <div className="edit-item" onClick={() => this.openEditCommentModal(comments[comment])}></div>
                                    <div className="delete-item" onClick={() => this.deleteComment(comment)}></div>
                                </div>

                            </li>))}
                    </div>
                    }
                    {(showComments) && (
                        <form className="add-comment" onSubmit={(event) => { this.submitComment(event, post.id) }} >
                            <textarea id="comment" name="body" ref={(nBody) => this.nBody = nBody}  onChange={(event) => this.newComment()} placeholder="Write a comment ..."></textarea>
                            <div>
                                <input type="text" name="author" ref={(nAuthor) => this.nAuthor = nAuthor}  onChange={(event) => this.newComment()} placeholder="Enter Username" />
                                <button className="submit-comment" ref={(nButton) => this.nButton = nButton}  disabled>Submit</button>
                            </div>
                        </form>
                    )}
                </div>)}

                <Modal className="modal"
                    overlayClassName="overlay"
                    isOpen={editPostModal}
                    onRequestClose={this.closeEditPostModal}
                    contentLabel="Modal" >
                    {editPostModal &&
                        <div>
                            <button className="modal-close"
                                onClick={this.closeEditPostModal} >
                            </button>
                            <h1 className="modal-heading" > Edit {category === "all" ? "" : `${capitalize(category)} `}Post </h1>
                            <form onSubmit={(event) => this.submitPost(event, post.id)} >
                                <input type="text"  ref={(title) => this.title = title} onChange={() => this.changedPost()} name="title" defaultValue={post.title} />
                                <input type="text"  ref={(author) => this.author = author} onChange={() => this.changedPost()} name="author" defaultValue={post.author} />
                                <select name="category"  ref={(category) => this.category = category} onChange={(event) => this.changedPost()} defaultValue={post.category}>
                                    {
                                        categories.map((thisCategory) => (<option value={thisCategory} key={thisCategory}>
                                            {capitalize.words(thisCategory)} </option>))
                                    }
                                </select>
                                <textarea name="body"  ref={(body) => this.body = body}  onChange={(event) => this.changedPost()} defaultValue={post.body} />
                                <button disabled  ref={(button) => this.button = button}> Post </button>
                            </form>
                        </div>
                    } </Modal>

                <Modal className="modal"
                    overlayClassName="overlay"
                    isOpen={editCommentModal}
                    onRequestClose={this.closeEditCommentModal}
                    contentLabel="Modal" >
                    {editCommentModal &&
                        <div>
                            <button className="modal-close"
                                onClick={this.closeEditCommentModal} >
                            </button>
                            <h1 className="modal-heading" > Edit Comment </h1>
                            <form onSubmit={(event) => this.submitEditedComment(event)} >
                                <input type="text" name="author"  ref={(cAuthor) => this.cAuthor = cAuthor} onChange={() => this.changedComment()} defaultValue={commentToEdit.author} />
                                <textarea name="body" ref={(cBody) => this.cBody = cBody} onChange={() => this.changedComment()} defaultValue={commentToEdit.body} />
                                <button disabled ref={(cButton) => this.cButton = cButton}> Submit </button>
                            </form>
                        </div>
                    } </Modal>

            </div>);
    }
}


function mapStateToProps({ posts, categories }) {

    let postValue = {}, commentValue = {}, categoryValue = {}, categoryList = {};

    if (posts.posts !== undefined)
        postValue = posts.posts;

    if (posts.comments !== undefined)
        commentValue = posts.comments;

    if (categories.category !== undefined)
        categoryValue = categories.category;

    if (categories.categories !== undefined) {
        categoryList = categories.categories.reduce((result, category) => {
            result.push(category.name);
            return result;
        }, []);
    }

    return { posts: postValue, comments: commentValue, category: categoryValue, categories: categoryList };
}

function mapDispatchToProps(dispatch) {
    return {
        postVote: (post, option) => {
            dispatch(fetchVotePost(post, option))
        },
        commentVote: (comment, option) => {
            dispatch(fetchVoteComment(comment, option))
        },
        newComment: (comment) => {
            dispatch(fetchAddNewComment(comment))
        },
        editPost: (postId, post) => {
            dispatch(fetchUpdatePost(postId, post))
        },
        editComment: (commentId, comment) => {
            dispatch(fetchUpdateComment(commentId, comment))
        },
        removePost: (postId) => {
            dispatch(fetchDeletePost(postId))
        },
        removeComment: (commentId) => {
            dispatch(fetchDeleteComment(commentId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);