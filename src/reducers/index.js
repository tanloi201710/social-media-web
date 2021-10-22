import { combineReducers } from 'redux';
import auth from './auth';
import posts from './post';
import user from './user';
import upload from './upload';
import conversation from './conversation';
import socket from './socket';

export default combineReducers({
    auth, posts, user, upload, conversation, socket
});