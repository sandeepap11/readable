import * as ReadableAPI from '../utils/ReadableAPI';

export const LOAD_ALL_POSTS = "LOAD_ALL_POSTS";
export const LOAD_POSTS_FOR_CATEGORY = "LOAD_POSTS_FOR_CATEGORY";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const GET_POST = "GET_POST";
export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";


export const loadAllPosts = (posts) => {


console.log(posts);
  return {
    type: LOAD_ALL_POSTS,
    posts

  }

};

export const fetchAllPosts = () => dispatch => {
  console.log("Called");
  ReadableAPI
      .getPosts()
      .then(posts => dispatch(loadAllPosts(posts)));
};

export const loadPostsForCategory = (category, posts) => {


console.log(posts);
  return {
    type: LOAD_POSTS_FOR_CATEGORY,
    category,
    posts

  }

};

export const fetchPostsForCategory = (category) => dispatch => {
  console.log("Called");
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
  console.log("Called");
  ReadableAPI
      .createPost(post)
      .then(post => dispatch(createNewPost(post)));
};

export const getPost = (post, comments) => {


  console.log("de accion",post);
    return {
      type: GET_POST,
      post,
      comments

    }
  
  };
  
  export const fetchPostById = (postId) => dispatch => {
    console.log("Called");
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
    console.log("Called");
    ReadableAPI
        .comment(comment)
        .then(comment => dispatch(createNewComment(comment)));
  };