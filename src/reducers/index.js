import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getAllZonesReducer from './GetAllZonesReducer';

const reducers = combineReducers({
    loginResponse,
    resetPasswordResponse,
    getAllZonesReducer
});

export default reducers;