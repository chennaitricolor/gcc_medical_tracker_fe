import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getAllZonesReducer from './GetAllZonesReducer';
import getPersonsByWardReducer from './GetPersonsByWardReducer';
import getLocationsByTypeReducer from './GetLocationsByTypeReducer';
import getPersonsDetailReducer from './getPersonsDetailReducer';
import contractedPersonReducer from './contractedPersonReducer';
import getDashboardEmbedUrlReducer from './GetDashboardEmbedUrlReducer';
import searchHospitalNameReducer from './searchHospitalNameReducer';

const reducers = combineReducers({
  loginResponse,
  resetPasswordResponse,
  getAllZonesReducer,
  getPersonsByWardReducer,
  getLocationsByTypeReducer,
  searchHospitalNameReducer,
  getPersonsDetailReducer,
  contractedPersonReducer,
  getDashboardEmbedUrlReducer,
});

export default reducers;
