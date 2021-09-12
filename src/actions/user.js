import * as api from '../api';
import { AUTH, END_UPDATING, START_UPDATING } from '../constants/actionTypes';

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
