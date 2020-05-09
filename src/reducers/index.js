import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getAllZonesReducer from './GetAllZonesReducer';
import getPersonsByWardReducer from './GetPersonsByWardReducer';
import getLocationsByTypeReducer from './GetLocationsByTypeReducer';
import addContractedPersonReducer from './addContractedPersonReducer';

const reducers = combineReducers({
  loginResponse,
  resetPasswordResponse,
  getAllZonesReducer,
  getPersonsByWardReducer,
  getLocationsByTypeReducer,
  addContractedPersonReducer,
});

export default reducers;
