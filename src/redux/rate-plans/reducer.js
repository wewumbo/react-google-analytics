import {
    RATE_LIST,
    EDIT_RATE,
    ROOM_CATEGORIES,
    MEAL_PLANS
} from '../constants/';

const INIT_STATE = {
    list: [],
    edit: {
        name: ''
    },
    roomCategories: [],
    mealPlans: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case RATE_LIST:
            return {
                ...state,
                list: action.payload
            };
        case EDIT_RATE:
            return {
                ...state,
                edit: action.payload
            };
        case ROOM_CATEGORIES:
            return {
                ...state,
                roomCategories: action.payload
            };
        case MEAL_PLANS:
            return {
                ...state,
                mealPlans: action.payload
            };
        default:
            return state;
    }
};