import * as ReadableAPI from '../utils/ReadableAPI';

export const SET_CATEGORY = "SET_CATEGORY";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_ALL_POSTS = "LOAD_ALL_POSTS";
export const LOAD_POSTS_FOR_CATEGORY = "LOAD_POSTS_FOR_CATEGORY";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const GET_POST = "GET_POST";
export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const VOTE_POST = "VOTE_POST";
export const VOTE_COMMENT = "VOTE_COMMENT";

export const setCategory = (category) => {

  return {
    type: SET_CATEGORY,
    category
  }

};


export const loadCategories = (categories) => {

  return {
    type: LOAD_CATEGORIES,
    categories

  }

};

export const fetchCategories = () => dispatch => {

  ReadableAPI
    .getCategories()
    .then(categories => dispatch(loadCategories(categories)));
};

export const loadAllPosts = (posts) => {

  return {
    type: LOAD_ALL_POSTS,
    posts

  }

};

export const fetchAllPosts = () => dispatch => {

  ReadableAPI
    .getPosts()
    .then(posts => dispatch(loadAllPosts(posts)));
};

export const loadPostsForCategory = (category, posts) => {

  return {
    type: LOAD_POSTS_FOR_CATEGORY,
    category,
    posts

  }

};

export const fetchPostsForCategory = (category) => dispatch => {

  ReadableAPI
    .getCategoryPosts(category)
    .then(posts => dispatch(loadPostsForCategory(category, posts)));
};

export const createNewPost = (post) => {

  return {
    type: ADD_NEW_POST,
    post

  }

};

export const addNewPost = (post) => dispatch => {

  ReadableAPI
    .createPost(post)
    .then(post => dispatch(createNewPost(post)));
};

export const getPost = (post, comments) => {

  return {
    type: GET_POST,
    post,
    comments

  }

};

export const fetchPostById = (postId) => dispatch => {

  ReadableAPI
    .getPost(postId)
    .then(post => {
      ReadableAPI
        .getComments(postId)
        .then(comments => dispatch(getPost(post, comments)));

    });
};

export const createNewComment = (comment) => {

  return {
    type: ADD_NEW_COMMENT,
    comment

  }

}

export const addNewComment = (comment) => dispatch => {

  ReadableAPI
    .comment(comment)
    .then(comment => dispatch(createNewComment(comment)));
};

export const votePost = (post, option) => {

  return {
    type: VOTE_POST,
    post,
    option

  }

}

export const voteForPost = (postId, option) => dispatch => {

  ReadableAPI
    .votePost(postId, option)
    .then(post => dispatch(votePost(post, option)));
};

export const voteComment = (comment, option) => {

  return {
    type: VOTE_COMMENT,
    comment,
    option

  }

}

export const voteForComment = (commentId, option) => dispatch => {

  ReadableAPI
    .voteComment(commentId, option)
    .then(comment => dispatch(voteComment(comment, option)));
};