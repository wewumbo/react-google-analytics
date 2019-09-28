
import {
    PROPERTY,
    PROPERTY_FACILITIES,
} from '../constants';

export const setProperty = (payload) => {
    return {
        type: PROPERTY,
        payload
    }
}

export const setPropertyFacilities = (payload) => {
    return {
        type: PROPERTY_FACILITIES,
        payload
    }
}
