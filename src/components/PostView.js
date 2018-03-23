import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import capitalize from 'capitalize';
import { voteForPost, voteForComment, addNewComment, fetchUpdatePost, fetchUpdateComment } from '../actions';
import * as PostUtils from '../utils/PostUtils';

class PostView extends Component {

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

    render() {
        const { post, showComments, comments, category, categories } = this.props;
        const { editPostModal, editCommentModal, commentToEdit } = this.state;

        return (

            <div>
                {(<div className="post" >
                    {showComments ? (<h2 > {post.title} </h2>)
                        : (<Link to={`/post/${post.id}`}><h2> {post.title} </h2></Link>)}
                    <div className="fine-details">
                        <p> {post.author} </p>
                        <p> {capitalize(post.category)} </p>
                        <p> {PostUtils.getDate(post.timestamp)} </p>
                    </div>
                    <div className="post-body" >
                        <p > {post.body} </p>
                    </div>
                    <div className="post-counts" >
                        <div className="votes"><div className="upvote" onClick={() => { this.votePost(post.id, "upVote") }}></div> <div className="downvote" onClick={() => { this.votePost(post.id, "downVote") }}></div>
                            <p>{post.voteScore} </p></div>
                        <div className="votes"><div className="comments"></div>
                            <p> {post.commentCount} </p></div>
                        <div className="edit-item" onClick={this.openEditPostModal}></div>
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
                                    <div className="edit-item" onClick={() => this.openEditCommentModal(comments[comment])}></div>
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
                            <h1 className="posts-heading" > Edit {category === "all" ? "" : `${capitalize(category)} `}Post </h1>
                            <form onSubmit={(event) => this.submitPost(event, post.id)} >
                                <input type="text" name="title" required defaultValue={post.title} />
                                <input type="text" name="author" required defaultValue={post.author} />
                                <select name="category" defaultValue={post.category}>
                                    {
                                        categories.map((thisCategory) => (<option value={thisCategory} key={thisCategory}>
                                            {capitalize.words(thisCategory)} </option>))
                                    }
                                </select>
                                <textarea name="body" required defaultValue={post.body} />
                                <button> Post </button>
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
                            <h1 className="posts-heading" > Edit Comment </h1>
                            <form onSubmit={(event) => this.submitEditedComment(event)} >
                                <input type="text" name="author" required defaultValue={commentToEdit.author} />
                                <textarea name="body" required defaultValue={commentToEdit.body} />
                                <button> Submit </button>
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
            dispatch(voteForPost(post, option))
        },
        commentVote: (comment, option) => {
            dispatch(voteForComment(comment, option))
        },
        newComment: (comment) => {
            dispatch(addNewComment(comment))
        },
        editPost: (postId, post) => {
            dispatch(fetchUpdatePost(postId, post))
        },
        editComment: (commentId, comment) => {
            dispatch(fetchUpdateComment(commentId, comment))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);