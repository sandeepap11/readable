import { combineReducers } from 'redux';
import { LOAD_POSTS_FOR_CATEGORY, LOAD_ALL_POSTS, ADD_NEW_POST, GET_POST } from '../actions';

function posts(state={}, action){

  const {category, posts, post, comments} = action
  switch(action.type){

    case LOAD_ALL_POSTS:

      return{

        ...state,
        posts: posts
      }

    case LOAD_POSTS_FOR_CATEGORY:

      return{

        ...state,
        posts: posts.filter((post) => post.category === category)
      }

      case ADD_NEW_POST:

      return{

        ...state,
        posts: state["posts"].concat(post)
      }

      case GET_POST:
      post.comments = comments;
      
      return{
        ...state,
        post: post

      }

    default:
      return state
  }
}

export default combineReducers({ posts })
