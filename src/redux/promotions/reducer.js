import {
    PROMOTION_LIST,
    EDIT_PROMOTION,
    PROMOTION_TYPES,
} from '../constants/';

const INIT_STATE = {
    list: [],
    types: [],
    edit: {
        _id: '',
        name: ''
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case PROMOTION_LIST:
            return {
                ...state,
                list: action.payload
            };
        case EDIT_PROMOTION:
            return {
                ...state,
                edit: action.payload
            };
        case PROMOTION_TYPES:
            return {
                ...state,
                types: action.payload
            };
        default:
            return state;
    }
};