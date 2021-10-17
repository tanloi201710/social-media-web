import { SET_CONVERSATION } from "../constants/actionTypes";

const INITIALSTATE = {
    conversations: []
}

const conversationReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case SET_CONVERSATION:
            return { conversations: action.payload };
    
        default:
            return state;
    }
}

export default conversationReducer;