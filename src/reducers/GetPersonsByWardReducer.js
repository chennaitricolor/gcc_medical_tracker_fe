import actions from '../actions/GetPersonsByWardAction';
import toastActions from '../actions/ToastAction';

const defaultState = {
    personsByWard: '',
    personsByWardError: '',
    isLoading: false,
};

const getPersonsByWardReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actions.GET_PERSONS_BY_WARD:
            return Object.assign({}, state, {
                isLoading: true,
                personsByWard: payload,
            });
        case actions.GET_PERSONS_BY_WARD_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                personsByWard: payload,
            });
        case actions.GET_PERSONS_BY_WARD_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                personsByWardError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                personsByWardError: '',
            });
        default:
            return state;
    }
};

export default getPersonsByWardReducer;
