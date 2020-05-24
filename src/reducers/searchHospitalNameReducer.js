import actions from '../actions/searchHospitalListAction';
import toastActions from '../actions/ToastAction';

const defaultState = {
  hospitalDetails: '',
  hospitalDetailsError: '',
  isLoading: false,
};

const searchHospitalNameReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.SEARCH_HOSPITAL_DETAILS:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case actions.SEARCH_HOSPITAL_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hospitalDetails: payload,
      });
    case actions.SEARCH_HOSPITAL_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        hospitalDetailsError: payload,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        hospitalDetailsError: '',
      });
    default:
      return state;
  }
};

export default searchHospitalNameReducer;
