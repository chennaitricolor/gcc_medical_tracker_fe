import toastActions from '../actions/ToastAction';
import actions from '../actions/getPatientsLocation';

const defaultState = {
  patientsLocation: '',
  patientsLocationError: '',
  isLoading: false,
};

const getPatientsLocationReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_PATIENTS_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        patientsLocation: payload,
      });
    case actions.GET_PATIENTS_LOCATION_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        patientsLocationError: payload,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        patientsLocationError: '',
      });
    default:
      return state;
  }
};

export default getPatientsLocationReducer;
