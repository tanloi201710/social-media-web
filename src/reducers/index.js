import { combineReducers } from 'redux';
import auth from './auth';
import posts from './post';
import errors from './error';

export default combineReducers({
    auth, posts, errors
});