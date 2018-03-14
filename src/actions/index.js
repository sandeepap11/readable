import * as ReadableAPI from '../utils/ReadableAPI';

export const LOAD_POSTS_FOR_CATEGORY = "LOAD_POSTS_FOR_CATEGORY";

export const loadPostsForCategory = (posts) => {

console.log("Me too");
console.log(posts);
  return {
    type: LOAD_POSTS_FOR_CATEGORY,
    posts

  }

}

export const fetchPostsForCategory = (category) => dispatch => {
  console.log("Called");
  ReadableAPI
      .getCategoryPosts(category)
      .then(posts => dispatch(loadPostsForCategory(posts)));
};
