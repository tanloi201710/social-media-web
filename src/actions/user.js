import * as api from '../api';
import { AUTH, END_UPDATING, FOLLOW, START_UPDATING, UNFOLLOW } from '../constants/actionTypes';

export const updateUser = (id,formData) => async(dispatch) => {
    try {
        dispatch({ type: START_UPDATING });
        const { data } = await api.updateUser(id,formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_UPDATING });
    } catch (error) {
        console.log(error);
    }
};

export const followUser = (id) => async (dispatch) => {
    try {
        await api.follow(id);
        dispatch({ type: FOLLOW, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const unfollowuser = (id) => async (dispatch) => {
    try {
        await api.unfollow(id);
        dispatch({ type: UNFOLLOW, payload: id });
    } catch (error) {
        console.log(error);
    }
}