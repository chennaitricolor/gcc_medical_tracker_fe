import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getAllZonesReducer from './GetAllZonesReducer';
import getPersonsByWardReducer from "./GetPersonsByWardReducer";

const reducers = combineReducers({
    loginResponse,
    resetPasswordResponse,
    getAllZonesReducer,
    getPersonsByWardReducer
});

export default reducers;