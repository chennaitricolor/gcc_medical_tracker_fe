import actions from '../actions/GetLocationsByType';
import toastActions from '../actions/ToastAction';

const defaultState = {
    locationsByType: '',
    locationsByTypeError: '',
    isLoading: false,
};

const getLocationsByTypeReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actions.GET_LOCATIONS_BY_TYPE:
            return Object.assign({}, state, {
                isLoading: true,
                locationsByType: payload,
            });
        case actions.GET_LOCATIONS_BY_TYPE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                locationsByType: payload,
            });
        case actions.GET_LOCATIONS_BY_TYPE_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                locationsByTypeError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                locationsByTypeError: '',
            });
        default:
            return state;
    }
};

export default getLocationsByTypeReducer;
