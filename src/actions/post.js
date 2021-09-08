import * as api from '../api';
import { CREATE, DELETE, END_CREATING, END_DELETING, END_LOADING, FETCH_ALL, START_CREATING, START_DELETING, START_LOADING } from '../constants/actionTypes';

export const createPost = (newPost,history) => async(dispatch) => {
    try {
        dispatch({ type: START_CREATING });
        const {data} = await api.createPost(newPost);
        dispatch({
            type: CREATE,
            payload: data
        });
        dispatch({ type: END_CREATING });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts();
        dispatch({
            type: FETCH_ALL,
            payload: { data }
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        await api.likePost(id);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_DELETING });
        await api.deletePost(id);
        dispatch({ type: END_DELETING });
        dispatch({
            type: DELETE,
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
}