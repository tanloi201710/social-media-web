import { combineReducers } from 'redux';
import auth from './auth';
import posts from './post';
import errors from './error';
import user from './user';

export default combineReducers({
    auth, posts, errors, user
});