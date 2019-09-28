import {
   DATA
} from '../constants/';

const INIT_STATE = {
    data: {},
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case DATA:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};