import {
    PROPERTY,
    PROPERTY_FACILITIES
} from '../constants/';

const INIT_STATE = {
    details: { logo: "", photo: [] },
    facilities: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case PROPERTY:
            return {
                ...state,
                details: action.payload
            };
        case PROPERTY_FACILITIES:
            return {
                ...state,
                facilities: action.payload
            };
        default:
            return state;
    }
};