import * as api from '../api';
import { CREATE, END_LOADING, FETCH_ALL, START_LOADING } from '../constants/actionTypes';

export const createPost = (newPost,history) => async(dispatch) => {
    try {
        const {data} = await api.createPost(newPost);
        dispatch({
            type: CREATE,
            payload: data
        });
        history.push('/');
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
        await api.deletePost(id);
    } catch (error) {
        console.log(error);
    }
}