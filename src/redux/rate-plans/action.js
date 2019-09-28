import {
    RATE_LIST,
    EDIT_RATE,
    ROOM_CATEGORIES,
    MEAL_PLANS,
    
} from '../constants';

export const setList = (payload) => {
    return {
        type: RATE_LIST,
        payload
    }
}


export const setEdit = (payload) => {
    return {
        type: EDIT_RATE,
        payload
    }
}

export const setRoomCategories = (payload) => {
    return {
        type: ROOM_CATEGORIES,
        payload
    }
}

export const setMealPlans = (payload) => {
    return {
        type: MEAL_PLANS,
        payload
    }
}








