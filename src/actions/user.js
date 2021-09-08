import * as api from '../api';
import { END_UPDATING, START_UPDATING, UPDATE_USER } from '../constants/actionTypes';

export const updateUser = (id,formData) => async(dispatch) => {
    try {
        dispatch({ type: START_UPDATING });
        const { data } = await api.updateUser(id,formData);
        dispatch({ type: UPDATE_USER, data });
        dispatch({ type: END_UPDATING });
    } catch (error) {
        console.log(error);
    }
};
