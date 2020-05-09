import actions from '../actions/addContractedPersonsAction';
import toastActions from '../actions/ToastAction';

const defaultState = {
  addContractedPersonMessage: '',
  addContractedPersonError: '',
};

const addContractedPersonReducer = (state = defaultState, { type, response }) => {
  switch (type) {
    case actions.ADD_CONTRACTED_PERSONS:
      return Object.assign({}, state, {
        addContractedPersonMessage: '',
        addContractedPersonError: '',
      });
    case actions.ADD_CONTRACTED_PERSONS_SUCCESS:
      return Object.assign({}, state, {
        addContractedPersonMessage: response,
        addContractedPersonError: '',
      });
    case actions.ADD_CONTRACTED_PERSONS_FAILURE:
      return Object.assign({}, state, {
        addContractedPersonError: response,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        addContractedPersonMessage: '',
        addContractedPersonError: '',
      });
    default:
      return state;
  }
};

export default addContractedPersonReducer;
