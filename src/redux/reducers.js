import { combineReducers } from 'redux';
import settings from './settings/reducer';
import chatReducer from "./chat/reducer";
import contactReducer from "./contacts/";
import emailReducer from "./email/";
import auth from "./auth/reducer";
import property from "./property/reducer";
import rooms from "./rooms/reducer";
import rate_plans from "./rate-plans/reducer";
import promotions from "./promotions/reducer";
import availability from "./availability/reducer";
import avl from "./avl/reducer";

const reducers = combineReducers({
    settings,
    chatReducer,
    contactReducer,
    emailReducer,
    auth,
    property,
    rooms,
    rate_plans,
    promotions,
    availability,
    avl
});

export default reducers;