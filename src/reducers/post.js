import { CREATE, DELETE, END_CREATING, END_DELETING, END_LOADING, FETCH_ALL, START_CREATING, START_DELETING, START_LOADING } from "../constants/actionTypes";

const initState = {
    isLoading: true,
    creating: false,
    deleting: false,
    posts: []
};

const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            console.log("loading");
            return { ...state, isLoading: true };

        case END_LOADING:
            console.log("loaded");
            return { ...state, isLoading: false };
            
        case START_CREATING:
            console.log("creating");
            return { ...state, creating: true };

        case END_CREATING:
            console.log("created");
            return {...state, creating: false };

        case START_DELETING:
            console.log("deleting");
            return {...state, deleting: true };

        case END_DELETING:
            console.log("deleted");
            return {...state, deleting: false };

        case CREATE:
            return { posts: [...state.posts, action.payload], ...state};
    
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
            };

        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};

        default:
            return state;
    }
};

export default postsReducer;