import {
    AVAILABILITY_DATA,
    AVAILABILITY
} from '../constants/';

const INIT_STATE = {
    data: { days: [], data_grid: []},
    availability: []

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AVAILABILITY_DATA:
            return {
                ...state,
                data: action.payload
            };
        case AVAILABILITY:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};