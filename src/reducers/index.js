import { combineReducers } from 'redux';
import { LOAD_POSTS_FOR_CATEGORY, LOAD_ALL_POSTS, ADD_NEW_POST, 
  GET_POST, ADD_NEW_COMMENT, SET_CATEGORY, LOAD_CATEGORIES} from '../actions';

function categories(state={}, action) {

  const {categories, category} = action;
  switch(action.type){

    
    
    case SET_CATEGORY: 

    console.log("In set reducer", category);
      return{
        ...state,
        category: category
      };

      
      case LOAD_CATEGORIES: 
      return{
        ...state,
        categories: categories
      };

    default: 
      return state;
    }
}


function posts(state={}, action) {

  const {category, posts, post, comments, comment} = action;
  switch(action.type){

    case LOAD_ALL_POSTS:
    console.log("All posts le rahe hai");
    

      return{

        ...state,
        posts: posts
      };

    
    case LOAD_POSTS_FOR_CATEGORY:

      return{

        ...state,
        posts: posts.filter((post) => post.category === category)
      };

      case ADD_NEW_POST:

      return{

        ...state,
        posts: state["posts"].concat(post)
      };

      case GET_POST:
      post.comments = comments;
      
      return{
        ...state,
        post: post

      };

      case ADD_NEW_COMMENT:
      console.log(state);
      
      
      return{

        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
          comments: state.post.comments.concat(comment)
        }
      };

    default:
      return state;
  }
}

export default combineReducers({ posts, categories })
