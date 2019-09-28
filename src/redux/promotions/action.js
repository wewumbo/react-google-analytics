import {
    PROMOTION_LIST,
    EDIT_PROMOTION,
    PROMOTION_TYPES,
    
} from '../constants';

export const setList = (payload) => {
    return {
        type: PROMOTION_LIST,
        payload
    }
}

export const setEdit = (payload) => {
    return {
        type: EDIT_PROMOTION,
        payload
    }
}

export const setTypes = (payload) => {
    return {
        type: PROMOTION_TYPES,
        payload
    }
}








