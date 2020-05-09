import React, { useEffect, useReducer, useState } from 'react';
import TravellerInformationComponent from '../components/TravellerInformationComponent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { formatDateToMMDDYYYYWithTimeFormat } from '../utils/GeneralUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import getLocationsByType from '../actions/GetLocationsByType';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/ToastAction';

const TravellerInformationContainer = (props) => {
  const dispatch = useDispatch();

  const locationsList = useSelector((state) => state.getLocationsByTypeReducer);
  const addContractedPersonResponse = useSelector((state) => state.addContractedPersonReducer);

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
    currentAddressSame: '',
    currentAddress: {
      type: '',
      numberAndFloor: '',
      street: '',
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

  useEffect(() => {
    if (props.type === 'ADD') {
      return () => {
        setBasicDetails({
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
            area: '',
            city: '',
            state: '',
            pinCode: '',
            locationId: '',
          },
        });
        setCallDetails({
          phoneNumber: '',
          answeredBy: undefined,
          isSuspected: '',
          callSuccessFulIndicator: undefined,
          callFailureReason: undefined,
          callType: undefined,
        });
        setTransactionDetails({
          currentAddressSame: '',
          currentAddress: {
            type: '',
            numberAndFloor: '',
            street: '',
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
      };
    }
  }, [props.showDialog]);

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
            [id]: event.value === undefined ? event : event.value,
          });
        } else {
          setBasicDetails({
            [id]: undefined,
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
            [id]: undefined,
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
            [id]: undefined,
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
        if (event.target.value !== '') {
          setCallDetails({
            [event.target.id]: event.target.value,
          });
        } else {
          setCallDetails({
            [event.target.id]: undefined,
          });
        }
      }
      if (type === 'dropdown') {
        if (event !== null) {
          setCallDetails({
            [id]: event.value === undefined ? event : event.value,
          });
        } else {
          setCallDetails({
            [id]: undefined,
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
            [id]: undefined,
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
            [id]: undefined,
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
        if (event.target.value !== '') {
          setTransactionDetails({
            [event.target.id]: event.target.value,
          });
        } else {
          setTransactionDetails({
            [event.target.id]: undefined,
          });
        }
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
            [id]: undefined,
          });
        }
      }
    }
  };

  const handleAddressFieldInput = (event, id, type, i) => {
    if (event.length > 0 && event.length % 5 === 0) {
      dispatch({
        type: getLocationsByType.GET_LOCATIONS_BY_TYPE,
        payload: {
          pathVariable: id,
          param: {
            [id]: event,
          },
        },
      });
    }
  };

  const handleAddressFieldValuesOnChange = (event, id, type, i, calledBy) => {
    if (type === 'text') {
      if (event.target.value !== '') {
        if (calledBy === 'Basic Details') {
          setBasicDetails({
            address: {
              ...basicDetails.address,
              [event.target.id]: event.target.value,
            },
          });
        } else if (calledBy === 'Travel Details') {
          let temp = [];
          temp = temp.concat(...travelDetails);
          temp.forEach((a, index) => {
            if (index === i) {
              temp.splice(i, 1, {
                ...a,
                address: {
                  ...a.address,
                  [event.target.id]: event.target.value,
                },
              });
            }
          });
          setTravelDetails(temp);
        } else if (calledBy === 'Transaction Details') {
          setTransactionDetails({
            currentAddress: {
              ...transactionDetails.currentAddress,
              [event.target.id]: event.target.value,
            },
          });
        }
      } else {
        if (calledBy === 'Basic Details') {
          setBasicDetails({
            address: {
              ...basicDetails.address,
              [event.target.id]: undefined,
            },
          });
        } else if (calledBy === 'Travel Details') {
          let temp = [];
          temp = temp.concat(...travelDetails);
          temp.forEach((a, index) => {
            if (index === i) {
              temp.splice(i, 1, {
                ...a,
                address: {
                  ...a.address,
                  [event.target.id]: undefined,
                },
              });
            }
          });
          setTravelDetails(temp);
        } else if (calledBy === 'Transaction Details') {
          setTransactionDetails({
            currentAddress: {
              ...transactionDetails.currentAddress,
              [event.target.id]: event.target.value,
            },
          });
        }
      }
    }
    if (type === 'dropdown') {
      if (event !== null) {
        const idValue = id === 'street_name' ? 'street' : id;
        const selectedAreaList =
          id === 'area' &&
          locationsList !== undefined &&
          locationsList.locationsByType !== undefined &&
          locationsList.locationsByType.locations !== undefined
            ? locationsList.locationsByType.locations.filter((location) => location.area === event).map((location) => location.id)
            : [];
        const selectedArea = selectedAreaList.length > 0 ? selectedAreaList[0] : '';
        if (calledBy === 'Basic Details') {
          setBasicDetails({
            address: {
              ...basicDetails.address,
              [idValue]: event,
              locationId: selectedArea,
            },
          });
        } else if (calledBy === 'Travel Details') {
          let temp = [];
          temp = temp.concat(...travelDetails);
          temp.forEach((a, index) => {
            if (index === i) {
              temp.splice(i, 1, {
                ...a,
                address: {
                  ...a.address,
                  [idValue]: event,
                  locationId: selectedArea,
                },
              });
            }
          });
          setTravelDetails(temp);
        } else if (calledBy === 'Transaction Details') {
          setTransactionDetails({
            currentAddress: {
              ...transactionDetails.currentAddress,
              [idValue]: event,
              locationId: selectedArea,
            },
          });
        }
      } else {
        const idValue = id === 'street_name' ? 'street' : id;
        if (calledBy === 'Basic Details') {
          setBasicDetails({
            address: {
              ...basicDetails.address,
              [idValue]: '',
            },
          });
        } else if (calledBy === 'Travel Details') {
          let temp = [];
          temp = temp.concat(...travelDetails);
          temp.forEach((a, index) => {
            if (index === i) {
              temp.splice(i, 1, { ...a, [idValue]: '' });
            }
          });
          setTravelDetails(temp);
        } else if (calledBy === 'Transaction Details') {
          setTransactionDetails({
            currentAddress: {
              ...transactionDetails.currentAddress,
              [idValue]: '',
            },
          });
        }
      }
    }
  };

  const handleChangeForTravelDetailsDynamicFields = (event, id, type, i, dateFormat) => {
    let temp = [];
    temp = temp.concat(...travelDetails);

    temp.forEach((a, index) => {
      if (index === i) {
        if (type === 'text') {
          temp.splice(i, 1, { ...a, [id]: event.target.value });
        }
        if (type === 'dropdown') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event.value === undefined ? event : event.value });
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
            temp.splice(i, 1, { ...a, [id]: formatDateToMMDDYYYYWithTimeFormat(new Date(event.valueOf()), dateFormat) });
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

        if (type === 'dropdown') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event.value === undefined ? event : event.value });
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
      address: {
        type: '',
        numberAndFloor: '',
        street: '',
        area: '',
        city: '',
        state: '',
        pinCode: '',
        locationId: '',
      },
    });
    setTravelDetails(values);
  };

  const handleAddForContractedFields = () => {
    const values = [...contractedPersonFields];
    values.push({
      name: '',
      age: '',
      gender: '',
      phoneNumber: '',
      alternatePhoneNumber: undefined,
    });
    setContractedPersonFields(values);
  };

  const handleSave = () => {
    if (transactionDetails.currentAddressSame === 'Y') {
      transactionDetails.currentAddress = basicDetails.address;
    }
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
            travelDetails: travelDetails.length === 0 ? undefined : travelDetails,
            contractedPersons: contractedPersonFields.length === 0 ? undefined : contractedPersonFields,
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

  const handleToastClose = () => {
    dispatch({
      type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
    });
    props.handleCloseForDialog();
    setBasicDetails({
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
        area: '',
        city: '',
        state: '',
        pinCode: '',
        locationId: '',
      },
    });
    setCallDetails({
      phoneNumber: '',
      answeredBy: undefined,
      isSuspected: '',
      callSuccessFulIndicator: undefined,
      callFailureReason: undefined,
      callType: undefined,
    });
    setTransactionDetails({
      currentAddressSame: '',
      currentAddress: {
        type: '',
        numberAndFloor: '',
        street: '',
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
  };

  if (addContractedPersonResponse.addContractedPersonMessage !== '' && addContractedPersonResponse.addContractedPersonMessage !== undefined) {
    return (
      <ToastComponent
        toastMessage={'Record created successfully'}
        openToast={addContractedPersonResponse.addContractedPersonMessage !== ''}
        handleClose={handleToastClose}
        toastVariant={'success'}
      />
    );
  } else {
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
            addContractedPersonError={addContractedPersonResponse.addContractedPersonError}
            handleToastClose={handleToastClose}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
};

TravellerInformationContainer.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
  type: PropTypes.string,
};

export default TravellerInformationContainer;
