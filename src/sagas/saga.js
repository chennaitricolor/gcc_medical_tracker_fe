import { takeLatest, call } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routesActions from '../actions/RouteToPathAction';
import resetPasswordActions from "../actions/ResetPasswordAction";
import loginSaga from './LoginSaga';
import routesSaga from './RouteUrlsSaga';
import resetPasswordSaga from "./ResetPasswordSaga";


export default function* saga() {
    yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
    yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
    yield takeLatest(resetPasswordActions.RESET_PASSWORD, resetPasswordSaga);
}