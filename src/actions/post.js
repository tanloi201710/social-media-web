import * as api from '../api';
import { CREATE, FETCH_ALL } from '../constants/actionTypes';

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
        const { data } = await api.fetchPosts();
        dispatch({
            type: FETCH_ALL,
            payload: { data }
        });
        
    } catch (error) {
        console.log(error.message);
    }
};