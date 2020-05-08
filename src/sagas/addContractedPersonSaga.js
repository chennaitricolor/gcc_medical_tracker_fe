import { put, call } from 'redux-saga/effects';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* addContractedPersonsSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.addContractedPersons, {}, 'POST', action.payload.contractedDetails);
    console.log(response);
    yield put({
      type: addContractedPersonsAction.ADD_CONTRACTED_PERSONS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: addContractedPersonsAction.ADD_CONTRACTED_PERSONS_FAILURE,
      error,
    });
  }
}
