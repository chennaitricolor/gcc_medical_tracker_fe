import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';

const reducers = combineReducers({
    loginResponse,
    resetPasswordResponse
});

export default reducers;