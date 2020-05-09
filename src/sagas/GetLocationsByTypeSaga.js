import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetLocationsByType';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getLocationsByType(action) {
    try {
        let api_url = `${apiUrls.locationsByType}`;
        const response = yield call(callFetchApi, api_url, action.payload.param, 'GET');
        if (response.data !== undefined) {
            yield put({
                type: actions.GET_LOCATIONS_BY_TYPE_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: actions.GET_LOCATIONS_BY_TYPE_FAILURE,
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
                type: actions.GET_LOCATIONS_BY_TYPE_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    }
}
