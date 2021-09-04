import { ERROR } from "../constants/actionTypes";


const errorReducer = (state = { errorMsg: ''},action) => {
    switch (action.type) {
        case ERROR:
            return {...state, errorMsg: action?.message }
    
        default:
            return state;
    }
};

export default errorReducer;