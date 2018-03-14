import { combineReducers } from 'redux'
import { LOAD_POSTS_FOR_CATEGORY } from '../actions'

function posts(state={}, action){

  const {posts} = action
  switch(action.type){

    case LOAD_POSTS_FOR_CATEGORY:
    console.log({...state, posts:posts});
      return{

        ...state,
        posts: posts
      }

    default:
      return state
  }
}

export default combineReducers({ posts })
