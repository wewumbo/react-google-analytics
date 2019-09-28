import {
    ROOM_LIST,
    ROOM_AMENITIES,
    ROOM_VIEWS,
    EDIT_ROOM,
} from '../constants/';

const INIT_STATE = {
    roomList: [],
    roomAmenities: [{}],
    roomViews: [{}],
    editRoom: {
        name : "",
        room_view : "",
        occupancy : "",
        size : "",
        units : "",
        amenities : [],
        photos : []
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ROOM_LIST:
            return {
                ...state,
                roomList: action.payload
            };
        case ROOM_AMENITIES:
            return {
                ...state,
                roomAmenities: action.payload
            };
        case ROOM_VIEWS:
            return {
                ...state,
                roomViews: action.payload
            };
        case EDIT_ROOM:
            return {
                ...state,
                editRoom: action.payload
            };
        default:
            return state;
    }
};