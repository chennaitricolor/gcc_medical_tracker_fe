import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetPersonsByWardAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getPersonsByWard(action) {
    try {
        let api_url = `${apiUrls.getPersonsByWard + action.payload.wardId}`;
        const response = yield call(callFetchApi, api_url, {}, 'GET');
        if (response.data !== undefined) {
            yield put({
                type: actions.GET_PERSONS_BY_WARD_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: actions.GET_PERSONS_BY_WARD_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    } catch (e) {
        if (e.response.status === 401) {
            yield put({
                type: routeToPathAction.ROUTE_TO_PATH,
                payload: { path: '/' },
            });
        } else {
            yield put({
                type: actions.GET_PERSONS_BY_WARD_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    }
}
