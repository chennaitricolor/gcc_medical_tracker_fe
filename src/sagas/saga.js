import { takeLatest } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routesActions from '../actions/RouteToPathAction';
import resetPasswordActions from '../actions/ResetPasswordAction';
import getZonesAction from '../actions/GetZonesAction';
import getPersonsByWardAction from '../actions/GetPersonsByWardAction';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import loginSaga from './LoginSaga';
import routesSaga from './RouteUrlsSaga';
import resetPasswordSaga from './ResetPasswordSaga';
import getAllZones from './GetAllZonesSaga';
import getPersonsByWard from './GetPersonsByWardSaga';
import addContractedPersonsSaga from './addContractedPersonSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(resetPasswordActions.RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(getZonesAction.GET_ALL_ZONE, getAllZones);
  yield takeLatest(getPersonsByWardAction.GET_PERSONS_BY_WARD, getPersonsByWard);
  yield takeLatest(addContractedPersonsAction.ADD_CONTRACTED_PERSONS, addContractedPersonsSaga);
}
