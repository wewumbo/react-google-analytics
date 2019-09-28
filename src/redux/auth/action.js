
import {
    AUTH_TOKEN,
    IS_LOGGED_IN,
    USER,
} from '../constants';

export const setAuthToken = (payload) => {
    return {
        type: AUTH_TOKEN,
        payload
    }
}

export const setIsLoggedIn= (payload) => {
    return {
        type: IS_LOGGED_IN,
        payload
    }
}

export const setUser= (payload) => {
    return {
        type: USER,
        payload
    }
}

