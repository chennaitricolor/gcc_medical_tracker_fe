import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetDashboardEmbedAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getDashboardEmbedUrl() {
    try {
        const response = yield call(callFetchApi, apiUrls.getDashboardEmbedUrl, {}, 'GET');
        if (response.data !== undefined) {
            yield put({
                type: actions.GET_DASHBOARD_EMBED_URL_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: actions.GET_DASHBOARD_EMBED_URL_FAILURE,
                payload: 'Error in fetching Dashboard Embed Url',
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
                type: actions.GET_DASHBOARD_EMBED_URL_FAILURE,
                payload: 'Error in fetching Dashboard Embed Url',
            });
        }
    }
}
