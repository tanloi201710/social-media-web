import { CREATE, END_LOADING, FETCH_ALL, START_LOADING } from "../constants/actionTypes";

const initState = {
    isLoading: true,
    posts: []
};

const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };
            
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};
    
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
            };
        default:
            return state;
    }
};

export default postsReducer;