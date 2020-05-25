import { put, call } from 'redux-saga/effects';
import actions from '../actions/getPatientsLocation';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* getPatientsLocationSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.getPatientsLocation, {}, 'GET');
    if (response.data !== undefined) {
      yield put({
        type: actions.GET_PATIENTS_LOCATION_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: actions.GET_PATIENTS_LOCATION_FAILURE,
        payload: 'Error in fetching patient locations for report..',
      });
    }
  } catch (e) {
    yield put({
      type: actions.GET_PATIENTS_LOCATION_FAILURE,
      payload: 'Error in fetching Data',
    });
  }
}
