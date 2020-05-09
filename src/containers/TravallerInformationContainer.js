import React, { useReducer, useState } from 'react';
import TravellerInformationComponent from '../components/TravellerInformationComponent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { formatDateToMMDDYYYYWithTimeFormat } from '../utils/GeneralUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as PropTypes from 'prop-types';
import getLocationsByType from "../actions/GetLocationsByType";

const TravellerInformationContainer = (props) => {
  const dispatch = useDispatch();

  const locationsList = useSelector(state => state.getLocationsByTypeReducer);

  const [basicDetails, setBasicDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    name: '',
    age: '',
    gender: '',
    passport: undefined,
    phoneNumber: '',
    secondaryPhoneNumber: undefined,
    travelledAbroad: '',
    countryVisited: undefined,
    dateOfArraival: undefined,
    remarks: undefined,
    familyMembersCount: '',
    diabetesIndicator: '',
    hyperTensionIndicator: '',
    otherIllness: undefined,
    address: {
      type: '',
      numberAndFloor: '',
      street: '',
      addressMeta: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
      locationId: '',
    },
  });

  const [callDetails, setCallDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    phoneNumber: '',
    answeredBy: undefined,
    isSuspected: '',
    callSuccessFulIndicator: undefined,
    callFailureReason: undefined,
    callType: undefined,
  });

  const [transactionDetails, setTransactionDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    currentAddressSame: 'Y',
    currentAddress: {
      type: '',
      numberAndFloor: '',
      street: '',
      addressMeta: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
      locationId: '',
    },
    healthStatus: '',
    symptoms: undefined,
    dateOfFirstSymptom: undefined,
  });

  const [travelDetails, setTravelDetails] = useState([]);

  const [contractedPersonFields, setContractedPersonFields] = useState([]);

  const handleOnChangeForBasicDetails = (event, id, type, idx, dateFormat) => {
    if (idx !== null) {
      handleChangeForContractedPersonsDynamicFields(event, id, type, idx);
    } else {
      if (type === 'text') {
        if (event.target.value !== '') {
          setBasicDetails({
            [event.target.id]: event.target.value,
          });
        } else {
          setBasicDetails({
            [event.target.id]: undefined,
          });
        }
      }
      if (type === 'dropdown') {
        if (event !== null) {
          setBasicDetails({
            [id]: event.value,
          });
        } else {
          setBasicDetails({
            [id]: '',
          });
        }
      }
      if (type === 'phoneNumber') {
        if (event !== null) {
          setBasicDetails({
            [id]: event,
          });
        } else {
          setBasicDetails({
            [id]: '',
          });
        }
      }
      if (type === 'radioButton') {
        if (event !== null) {
          setBasicDetails({
            [id]: event.target.value,
          });
        }
      }
      if (type === 'date') {
        if (event !== null && event.valueOf() !== null) {
          setBasicDetails({
            [id]: formatDateToMMDDYYYYWithTimeFormat(new Date(event.valueOf()), dateFormat),
          });
        } else {
          setBasicDetails({
            [id]: null,
          });
        }
      }
    }
  };

  const handleOnChangeForCallDetails = (event, id, type, idx, dateFormat) => {
    if (idx !== null) {
      handleChangeForContractedPersonsDynamicFields(event, id, type, idx);
    } else {
      if (type === 'text') {
        setCallDetails({
          [event.target.id]: event.target.value,
        });
      }
      if (type === 'dropdown') {
        if (event !== null) {
          setCallDetails({
            [id]: event,
          });
        } else {
          setCallDetails({
            [id]: '',
          });
        }
      }
      if (type === 'phoneNumber') {
        if (event !== null) {
          setCallDetails({
            [id]: event,
          });
        } else {
          setCallDetails({
            [id]: '',
          });
        }
      }
      if (type === 'radioButton') {
        if (event !== null) {
          setCallDetails({
            [id]: event.target.value,
          });
        }
      }
      if (type === 'date') {
        if (event !== null && event.valueOf() !== null) {
          setCallDetails({
            [id]: formatDateToMMDDYYYYWithTimeFormat(new Date(event.valueOf(), dateFormat)),
          });
        } else {
          setCallDetails({
            [id]: null,
          });
        }
      }
    }
  };

  const handleOnChangeForTransactionDetails = (event, id, type, idx, dateFormat) => {
    if (idx !== null) {
      handleChangeForContractedPersonsDynamicFields(event, id, type, idx);
    } else {
      if (type === 'text') {
        setTransactionDetails({
          [event.target.id]: event.target.value,
        });
      }
      if (type === 'radioButton') {
        if (event !== null) {
          setTransactionDetails({
            [id]: event.target.value,
          });
        }
      }
      if (type === 'date') {
        if (event !== null && event.valueOf() !== null) {
          setTransactionDetails({
            [id]: formatDateToMMDDYYYYWithTimeFormat(new Date(event.valueOf()), dateFormat),
          });
        } else {
          setTransactionDetails({
            [id]: null,
          });
        }
      }
    }
  };

  const handleAddressFieldInput = (event, id, type, i) => {
    if(event.length > 0 && event.length % 5 === 0) {
    dispatch({
      type: getLocationsByType.GET_LOCATIONS_BY_TYPE,
      payload: {
        pathVariable: id,
        param: {
          [id] : event
        }
      }
    });
    }
  };

  const handleAddressFieldValuesOnChange = (event, id, type, i) => {
    if (type === 'text') {
      if (event.target.value !== '') {
        setBasicDetails({
          address : {
            ...basicDetails.address,
            [event.target.id]: event.target.value,
          }
        });
      } else {
        setBasicDetails({
          address: {
            ...basicDetails.address,
            [event.target.id]: undefined,
          }
        });
      }
    }
    if (type === 'dropdown') {
      if (event !== null) {
        const idValue = id === 'street_name' ? 'street' : id;
        const selectedAreaList = id === 'area' && locationsList !== undefined &&
        locationsList.locationsByType !== undefined &&
        locationsList.locationsByType.locations !== undefined ? locationsList.locationsByType.locations.filter(location => location.area === event).map(location => location.id): [];
        const selectedArea = selectedAreaList.length > 0 ? selectedAreaList[0] : '';
        setBasicDetails({
          address: {
            ...basicDetails.address,
            [idValue]: event,
            locationId: selectedArea
          }
        });
      } else {
        const idValue = id === 'street_name' ? 'street' : id;
        setBasicDetails({
          address: {
            ...basicDetails.address,
            [idValue]: '',
          }
        });
      }
    }
  }

  const handleChangeForTravelDetailsDynamicFields = (event, id, type, i) => {
    let temp = [];
    temp = temp.concat(...travelDetails);

    temp.forEach((a, index) => {
      if (index === i) {
        if (type === 'text') {
          temp.splice(i, 1, { ...a, [id]: event.target.value });
        }

        if (type === 'dropdownData') {
          let value = event.target.value;
          let array = value.split(',');
          array = array.map((string) => string.trim());
          temp.splice(i, 1, { ...a, [id]: array });
        }

        if (type === 'dropdown') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event });
          } else {
            temp.splice(i, 1, { ...a, [id]: null });
          }
        }

        if (type === 'radio') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event.target.value === 'yes' });
          } else {
            temp.splice(i, 1, { ...a, [id]: false });
          }
        }
        if (type === 'date') {
          if (event !== null && event.valueOf() !== null) {
            temp.splice(i, 1, { ...a, [id]: formatDateToMMDDYYYYWithTimeFormat(new Date(event.valueOf())) });
          } else {
            temp.splice(i, 1, { ...a, [id]: null });
          }
        }
      }
    });

    setTravelDetails(temp);
  };

  const handleChangeForContractedPersonsDynamicFields = (event, id, type, i) => {
    let temp = [];
    temp = temp.concat(...contractedPersonFields);

    temp.forEach((a, index) => {
      if (index === i) {
        if (type === 'text') {
          temp.splice(i, 1, { ...a, [id]: event.target.value });
        }

        if (type === 'dropdownData') {
          let value = event.target.value;
          let array = value.split(',');
          array = array.map((string) => string.trim());
          temp.splice(i, 1, { ...a, [id]: array });
        }

        if (type === 'dropdown') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event });
          } else {
            temp.splice(i, 1, { ...a, [id]: null });
          }
        }

        if (type === 'radio') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event.target.value === 'yes' });
          } else {
            temp.splice(i, 1, { ...a, [id]: false });
          }
        }
      }
    });

    setContractedPersonFields(temp);
  };

  const handleRemoveForTravelFields = (i) => {
    const values = [...travelDetails];
    values.splice(i, 1);
    setTravelDetails(values);
  };

  const handleRemoveForContractedFields = (i) => {
    const values = [...contractedPersonFields];
    values.splice(i, 1);
    setContractedPersonFields(values);
  };

  const handleAddForTravelDetails = () => {
    const values = [...travelDetails];
    values.push({
      placeOfVisit: '',
      placeType: '',
      visitedDate: null,
      modeOfTravel: '',
    });
    setTravelDetails(values);
  };

  const handleAddForContractedFields = () => {
    const values = [...contractedPersonFields];
    values.push({
      name: '',
      age: '',
      sex: '',
      phoneNumber: '',
      alternatePhoneNumber: undefined,
    });
    setContractedPersonFields(values);
  };

  const handleSave = () => {
    if (props.type === 'ADD') {
      dispatch({
        type: 'ADD_CONTRACTED_PERSONS',
        payload: {
          contractedDetails: {
            basicDetails: basicDetails,
            callDetails: {
              phoneNumber: callDetails.phoneNumber,
              answeredBy: callDetails.answeredBy,
              isSuspected: callDetails.isSuspected,
            },
            transactionDetails: transactionDetails,
          },
        },
      });
    } else if (props.type === 'UPDATE') {
      // TODO Failure Indicator
      dispatch({
        type: 'ADD_CONTRACTED_PERSONS',
        payload: {
          contractedDetails: {
            basicDetails: basicDetails,
            callDetails: {
              phoneNumber: callDetails.phoneNumber,
              answeredBy: callDetails.answeredBy,
              isSuspected: callDetails.isSuspected,
            },
            transactionDetails: transactionDetails,
          },
        },
      });
    }
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TravellerInformationComponent
          showDialog={props.showDialog}
          handleCloseForDialog={props.handleCloseForDialog}
          basicDetails={basicDetails}
          callDetails={callDetails}
          transactionDetails={transactionDetails}
          travelDetails={travelDetails}
          contractedFields={contractedPersonFields}
          handleOnChangeForBasicDetails={handleOnChangeForBasicDetails}
          handleOnChangeForCallDetails={handleOnChangeForCallDetails}
          handleOnChangeForTransactionDetails={handleOnChangeForTransactionDetails}
          handleChangeForTravelDetailsDynamicFields={handleChangeForTravelDetailsDynamicFields}
          handleChangeForContractedPersonsDynamicFields={handleChangeForContractedPersonsDynamicFields}
          handleAddForTravelDetails={handleAddForTravelDetails}
          handleAddForContractedFields={handleAddForContractedFields}
          handleRemoveForTravelFields={handleRemoveForTravelFields}
          handleRemoveForContractedFields={handleRemoveForContractedFields}
          handleAddressFieldChanges={handleAddressFieldInput}
          handleAddressFieldsOnValueChange={handleAddressFieldValuesOnChange}
          handleSave={handleSave}
          locationDetails={locationsList.locationsByType}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

TravellerInformationContainer.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
  type: PropTypes.string,
};

export default TravellerInformationContainer;
