import {
    DATA
    
} from '../constants';

export const setData = (payload) => {
    return {
        type: DATA,
        payload
    }
}

