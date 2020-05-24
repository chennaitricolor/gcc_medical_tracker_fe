import { put, call } from 'redux-saga/effects';
import actions from '../actions/searchHospitalListAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* searchHospitalNameSaga(action) {
  try {
    let api_url = `${apiUrls.searchHospitalName}`;
    const response = yield call(callFetchApi, api_url, action.payload.param, 'GET');
    if (response.data !== undefined) {
      yield put({
        type: actions.SEARCH_HOSPITAL_DETAILS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: actions.SEARCH_HOSPITAL_DETAILS_FAILURE,
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
        type: actions.SEARCH_HOSPITAL_DETAILS_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
