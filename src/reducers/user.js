import { END_UPDATING, START_UPDATING, UPDATE_USER } from '../constants/actionTypes';

const initState = {
    isUpdating: false,
    userData: null
};

const authReducer = (state = initState,action) => {
    switch (action.type) {
        case START_UPDATING:
            return { ...state, isUpdating: true };
    
        case END_UPDATING:
            return { ...state, isUpdating: false };
            
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, userData: action?.data }

        default:
            return state;
    }
};

export default authReducer;