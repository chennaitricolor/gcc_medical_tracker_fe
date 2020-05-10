import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import TravellerInformationComponent from '../components/TravellerInformationComponent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/ToastAction';
import MomentUtils from '@date-io/moment';
import { formatDateBasedOnFormat } from '../utils/GeneralUtils';
import getLocationsByType from '../actions/GetLocationsByType';
import LoadingComponent from '../components/LoadingComponent';
import _ from 'lodash';

const TravellerInformationContainer = (props) => {
  const dispatch = useDispatch();
  const locationsList = useSelector((state) => state.getLocationsByTypeReducer);
  const addContractedPersonResponse = useSelector((state) => state.contractedPersonReducer);

  const personDetails = useSelector((state) => state.getPersonsDetailReducer.personDetails);
  const isLoading = useSelector((state) => state.getPersonsDetailReducer.isLoading);

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
    currentAddressSame: undefined,
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
          currentAddressSame: undefined,
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

  const getValue = (value) => {
    if (value !== null && value !== '') {
      return value;
    }
    return undefined;
  };

  useEffect(() => {
    if (props.type === 'UPDATE') {
      if (personDetails !== null) {
        if (personDetails.basic !== undefined) {
          setBasicDetails({
            name: getValue(personDetails.basic.name),
            age: getValue(personDetails.basic.age),
            gender: getValue(personDetails.basic.gender),
            passport: getValue(personDetails.basic.passport_no),
            phoneNumber: getValue(personDetails.basic.phone_number),
            secondaryPhoneNumber: getValue(personDetails.basic.secondary_phone_number),
            travelledAbroad: getValue(personDetails.basic.travel_history_indicator),
            countryVisited: getValue(personDetails.basic.country_visited),
            dateOfArraival: getValue(formatDateBasedOnFormat(personDetails.basic.date_of_arrival, 'MM-DD-YYYY')),
            remarks: getValue(personDetails.basic.remarks),
            familyMembersCount: getValue(personDetails.basic.number_of_family_members),
            diabetesIndicator: getValue(personDetails.basic.diabetes_indicator),
            hyperTensionIndicator: getValue(personDetails.basic.hypertension_indicator),
            otherIllness: getValue(personDetails.basic.other_illness),
            address: {
              type: personDetails.basic.permanentAddress.buildingType,
              numberAndFloor: personDetails.basic.permanentAddress.flatBuildingNoAndFloor,
              street: personDetails.basic.permanentAddress.street,
              area: personDetails.basic.permanentAddress.area,
              city: personDetails.basic.permanentAddress.city,
              state: personDetails.basic.permanentAddress.state,
              pinCode: personDetails.basic.permanentAddress.pinCode,
              locationId: personDetails.basic.permanentAddress.locationId,
            },
          });
        }
        if (personDetails.lastCall !== undefined && personDetails.lastCall !== null) {
          setTransactionDetails({
            currentAddressSame: 'Y',
            currentAddress: {
              type: personDetails.lastCall.address.buildingType,
              numberAndFloor: personDetails.lastCall.address.flatBuildingNoAndFloor,
              street: personDetails.lastCall.address.street,
              area: personDetails.lastCall.address.area,
              city: personDetails.lastCall.address.city,
              state: personDetails.lastCall.address.state,
              pinCode: personDetails.lastCall.address.pinCode,
              locationId: personDetails.lastCall.address.locationId,
            },
            healthStatus: getValue(personDetails.lastCall.person_status),
            symptoms: getValue(personDetails.lastCall.symptoms),
            dateOfFirstSymptom: getValue(formatDateBasedOnFormat(personDetails.lastCall.date_of_first_symptom, 'MM-DD-YYYY')),
          });
        }
        if (personDetails.travel !== null) {
          const values = [...travelDetails];
          personDetails.travel.forEach((travel) => {
            values.push({
              placeOfVisit: travel.place_of_visit,
              placeType: travel.place_type,
              visitedDate: formatDateBasedOnFormat(travel.date_and_time_of_travel, 'MM-DD-YYYY'),
              modeOfTravel: travel.mode_of_travel,
              address: {
                type: travel.address.buildingType,
                numberAndFloor: travel.address.flatBuildingNoAndFloor,
                street: travel.address.street,
                area: travel.address.area,
                city: travel.address.city,
                state: travel.address.state,
                pinCode: travel.address.pinCode,
                locationId: travel.address.locationId,
              },
            });
          });
          setTravelDetails(values);
        }
      }
    }
  }, [personDetails]);

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
            [id]: formatDateBasedOnFormat(new Date(event.valueOf()), dateFormat),
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
            [id]: formatDateBasedOnFormat(new Date(event.valueOf(), dateFormat)),
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
            [id]: formatDateBasedOnFormat(new Date(event.valueOf()), dateFormat),
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
        } else if (calledBy === 'Contracted Details') {
          let temp = [];
          temp = temp.concat(...contractedPersonFields);
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
          setContractedPersonFields(temp);
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
        } else if (calledBy === 'Contracted Details') {
          let temp = [];
          temp = temp.concat(...contractedPersonFields);
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
          setContractedPersonFields(temp);
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
        } else if (calledBy === 'Contracted Details') {
          let temp = [];
          temp = temp.concat(...contractedPersonFields);
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
          setContractedPersonFields(temp);
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
        } else if (calledBy === 'Contracted Details') {
          let temp = [];
          temp = temp.concat(...contractedPersonFields);
          temp.forEach((a, index) => {
            if (index === i) {
              temp.splice(i, 1, { ...a, [idValue]: '' });
            }
          });
          setContractedPersonFields(temp);
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
            temp.splice(i, 1, { ...a, [id]: formatDateBasedOnFormat(new Date(event.valueOf()), dateFormat) });
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

        if (type === 'radioButton') {
          if (event !== null) {
            temp.splice(i, 1, { ...a, [id]: event.target.value });
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
      isAddressAvailable: '',
      address: undefined,
    });
    setContractedPersonFields(values);
  };

  const handleSave = () => {
    if (transactionDetails.currentAddressSame === 'Y' && props.type === 'UPDATE') {
      transactionDetails.currentAddress = basicDetails.address;
      transactionDetails.currentAddressChanged = transactionDetails.currentAddressSame;
      transactionDetails.currentAddressSame = undefined;
    }
    if (transactionDetails.currentAddressSame === 'Y' && props.type === 'ADD') {
      transactionDetails.currentAddress = basicDetails.address;
    }
    if (contractedPersonFields.length !== 0) {
      contractedPersonFields.forEach((contractedPersons) => {
        if (contractedPersons.isAddressAvailable !== 'Y') contractedPersons.address = undefined;
      });
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
      if (_.isEqual(basicDetails.address, personDetails.basic.permanentAddress)) {
        Object.assign(basicDetails, basicDetails, { addressChanged: 'N' });
      } else {
        Object.assign(basicDetails, basicDetails, { addressChanged: 'Y' });
      }
      dispatch({
        type: 'UPDATE_CONTRACTED_PERSONS',
        payload: {
          patientId: props.rowData.person_identifier,
          contractedDetails: {
            basicDetails: basicDetails,
            callDetails: {
              phoneNumber: callDetails.phoneNumber,
              answeredBy: callDetails.answeredBy,
              isSuspected: callDetails.isSuspected,
              callSuccessfulIndicator: callDetails.callSuccessFulIndicator,
              wrongNumberIndicator: callDetails.callSuccessFulIndicator !== 'Y' ? (callDetails.callFailureReason === 'wrongNumber' ? 'Y' : 'N') : 'N',
              callNotRespondingIndicator:
                callDetails.callSuccessFulIndicator !== 'Y' ? (callDetails.callFailureReason === 'callNotPicked' ? 'Y' : 'N') : 'N',
              incorrectPhoneNumber:
                callDetails.callSuccessFulIndicator !== 'Y' ? (callDetails.callFailureReason === 'incorrectPhoneNumber' ? 'Y' : 'N') : 'N',
              inboundOrOutbound: 'outgoing',
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
    if (addContractedPersonResponse.addContractedPersonMessage !== '' && addContractedPersonResponse.addContractedPersonMessage !== undefined) {
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
        currentAddressSame: undefined,
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
    }
  };

  if (addContractedPersonResponse.addContractedPersonMessage !== '' && addContractedPersonResponse.addContractedPersonMessage !== undefined) {
    return (
      <ToastComponent
        toastMessage={addContractedPersonResponse.addContractedPersonMessage}
        openToast={addContractedPersonResponse.addContractedPersonMessage !== ''}
        handleClose={handleToastClose}
        toastVariant={'success'}
      />
    );
  } else {
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <TravellerInformationComponent
              showDialog={props.showDialog}
              handleCloseForDialog={props.handleCloseForDialog}
              type={props.type}
              rowData={props.rowData}
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
          )}
        </MuiPickersUtilsProvider>
      </div>
    );
  }
};

TravellerInformationContainer.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
  type: PropTypes.string,
  rowData: PropTypes.object,
};

export default TravellerInformationContainer;
