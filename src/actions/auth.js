import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formdata,history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formdata);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formdata,history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formdata);
        dispatch({ type: AUTH, data });
        history.push('/changeInfo');
    } catch (error) {
        console.log(error);
    }
}