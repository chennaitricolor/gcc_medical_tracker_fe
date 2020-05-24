import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetPersonsByWardAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getPersonsByWard(action) {
    try {
        const offsetValue = action.payload.offset !== undefined && action.payload.offset !== '' ? action.payload.offset : 1;
        let api_url = `${apiUrls.getPersonsByWard + action.payload.wardId}?offset=${offsetValue}`;
        const response = yield call(callFetchApi, api_url, {}, 'GET');
        if (response.data !== undefined) {
            if(offsetValue === 1) {
                yield put({
                    type: actions.CLEAR_GET_PERSONS_BY_WARD,
                });
            }
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
