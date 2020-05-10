import { takeLatest } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routesActions from '../actions/RouteToPathAction';
import resetPasswordActions from '../actions/ResetPasswordAction';
import getZonesAction from '../actions/GetZonesAction';
import getPersonsByWardAction from '../actions/GetPersonsByWardAction';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import getLocationsByTypeAction from '../actions/GetLocationsByType';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import loginSaga from './LoginSaga';
import routesSaga from './RouteUrlsSaga';
import resetPasswordSaga from './ResetPasswordSaga';
import getAllZones from './GetAllZonesSaga';
import getPersonsByWard from './GetPersonsByWardSaga';
import getPersonsDetailSaga from "./getPersonsDetailSaga";
import getLocationsByType from './GetLocationsByTypeSaga';
import addContractedPersonsSaga from './addContractedPersonSaga';
import updateContractedPersonsSaga from './updateContractedPersonsSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(resetPasswordActions.RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(getZonesAction.GET_ALL_ZONE, getAllZones);
  yield takeLatest(getPersonsByWardAction.GET_PERSONS_BY_WARD, getPersonsByWard);
  yield takeLatest(getPersonsDetailAction.GET_PERSONS_DETAILS, getPersonsDetailSaga);
  yield takeLatest(addContractedPersonsAction.ADD_CONTRACTED_PERSONS, addContractedPersonsSaga);
  yield takeLatest(getLocationsByTypeAction.GET_LOCATIONS_BY_TYPE, getLocationsByType);
  yield takeLatest(updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS, updateContractedPersonsSaga);
}
