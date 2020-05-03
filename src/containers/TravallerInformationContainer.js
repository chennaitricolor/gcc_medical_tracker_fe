import React, { useReducer, useState } from 'react';
import TravellerInformationComponent from '../components/TravellerInformationComponent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const TravellerInformationContainer = (props) => {
  const [showDialog, setShowDialog] = useState(true);

  const [travellerInformation, setTravellerInformation] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    countryTravelledFrom: '',
    address: '',
    callSuccessful: '',
    callFailureReason: '',
  });

  const [contractedPersonFields, setContractedPersonFields] = useState([]);

  const handleOnChange = (event, id, type, idx) => {
    if (idx !== null) {
      handleChangeForContractedPersonsDynamicFields(event, id, type, idx);
    } else {
      if (type === 'text') {
        setTravellerInformation({
          [event.target.id]: event.target.value,
        });
      }
      if (type === 'dropdown') {
        if (event !== null) {
          setTravellerInformation({
            [id]: event,
          });
        } else {
          setTravellerInformation({
            [id]: '',
          });
        }
      }
      if (type === 'phoneNumber') {
        if (event !== null) {
          setTravellerInformation({
            [id]: event,
          });
        } else {
          setTravellerInformation({
            [id]: '',
          });
        }
      }
      if (type === 'radioButton') {
        if (event !== null) {
          setTravellerInformation({
            [id]: event.target.value,
          });
        }
      }
    }
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

  const handleRemoveForContractedFields = (i) => {
    const values = [...contractedPersonFields];
    values.splice(i, 1);
    setContractedPersonFields(values);
  };

  const travellerInformationResponse = {
    firstName: 'Johan',
    lastName: 'Arokiya Doss Doss',
    age: '45',
    sex: 'Male',
  };

  const handleAddForContractedFields = () => {
    const values = [...contractedPersonFields];
    values.push({
      firstName: '',
      lastName: '',
      age: '',
      sex: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
    });
    setContractedPersonFields(values);
  };

  const handleCloseForDialog = () => {
    setShowDialog(false);
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TravellerInformationComponent
          // travellerInformation={travellerInformation}
          showDialog={showDialog}
          handleCloseForDialog={handleCloseForDialog}
          travellerInformationResponse={travellerInformation}
          contractedFields={contractedPersonFields}
          handleOnChange={handleOnChange}
          handleAddForContractedFields={handleAddForContractedFields}
          handleRemoveForContractedFields={handleRemoveForContractedFields}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default TravellerInformationContainer;
