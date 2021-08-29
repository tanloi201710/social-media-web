import { CREATE, FETCH_ALL } from "../constants/actionTypes";

const initState = {
    isLoading: false,
    posts: []
};

const postsReducer = (state = initState, action) => {
    switch (action.type) {
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