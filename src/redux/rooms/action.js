import {
    ROOM_LIST,
    ROOM_AMENITIES,
    ROOM_VIEWS,
    EDIT_ROOM,
    
} from '../constants/';

export const setRoomList = (payload) => {
    return {
        type: ROOM_LIST,
        payload
    }
}

export const setRoomAmenities = (payload) => {
    return {
        type: ROOM_AMENITIES,
        payload
    }
}

export const setRoomViews = (payload) => {
    return {
        type: ROOM_VIEWS,
        payload
    }
}

export const setEditRoom = (payload) => {
    return {
        type: EDIT_ROOM,
        payload
    }
}



