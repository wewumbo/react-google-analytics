import {
    AUTH_TOKEN,
    IS_LOGGED_IN,
    USER
} from '../constants';

const INIT_STATE = {
    authToken: "",
    user: {name:''}
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            };
        case IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};