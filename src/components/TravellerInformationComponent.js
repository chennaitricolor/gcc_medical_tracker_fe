import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import jsonPath from 'jsonpath-plus';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import InputMask from 'react-input-mask';
import ToastComponent from './ToastComponent';
import { formatDateBasedOnFormat } from '../utils/GeneralUtils';

const useStyles = makeStyles(() => ({
  heading: {
    color: '#363636',
    fontSize: '20px',
  },
  subHeading: {
    color: '#363636',
    fontSize: '18px',
  },
  personalInformationDivider: {
    width: '100%',
    backgroundColor: '#0084FF',
    marginTop: '1%',
  },
  informationDivider: {
    width: '100%',
    marginTop: '1%',
    color: '#707070',
  },
  textField: {
    margin: '0',
    marginRight: '2%',
    width: '300px',

    '& label': {
      color: '#707070 !important',
      fontSize: '14px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  label: {
    '& label': {
      color: '#707070 !important',
      fontSize: '14px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  option: {
    fontSize: 14,
    '& > span': {
      marginRight: 10,
      fontSize: 16,
    },
  },
  phoneNumber: {
    marginRight: '2%',
    width: '300px',
    display: 'inline-block',
  },
  phoneNumberField: {
    marginRight: '2%',
    marginTop: '3%',
    width: '300px',

    '& button': {
      border: '1px solid #707070 !important',
    },
  },
  radioButton: {
    fontSize: '14px',
  },
  datePicker: {
    marginRight: '2%',
    width: '300px !important',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  dynamicFields: {
    marginTop: '2%',
  },
  '@global': {
    '.traveller-information-dialog > div:nth-child(3) > div:nth-child(1)': {
      width: '98%',
      height: '95%',
      color: '#707070',
    },
    '.traveller-information-travelledAbroad': {
      display: 'inline-block',
    },
    '.traveller-information-diabetesIndicator': {
      display: 'inline-block',
    },
    '.traveller-information-hyperTensionIndicator': {
      display: 'inline-block',
    },
    '.traveller-information-remarks': {
      width: '75%',
    },
    '.traveller-information-isSuspected': {
      display: 'inline-block',
    },
    '.traveller-information-callSuccessFulIndicator': {
      display: 'inline-block',
    },
    '.traveller-information-callFailureReason': {
      display: 'inline-block',
    },
    '.traveller-information-healthStatus': {
      display: 'inline-block',
    },
    '.traveller-information-visitedHospital': {
      display: 'inline-block',
    },
    '.traveller-information-currentAddressSame': {
      display: 'inline-block',
    },
    '.traveller-information-hospitalDetails': {
      marginTop: '2%',
    },
    '.traveller-information-notesAboutTravel': {
      width: '75%',
    },
    '.traveller-information-travelledUsingPublicTransport': {
      display: 'inline-block',
    },
    '.traveller-information-travelDetails': {
      marginTop: '2%',
    },
    '.traveller-information-otherNotes': {
      width: '75%',
    },
  },
}));

const getLastContactedDate = (callTransactionList) => {
  if (callTransactionList.length <= 0) {
    return '';
  }
  const lastTransaction = callTransactionList[callTransactionList.length - 1];
  return formatDateBasedOnFormat(new Date(lastTransaction.call_date), 'DD-MMM-YYYY');
};

const getCurrentPersonStatus = (callTransactionList) => {
  if (callTransactionList.length <= 0) {
    return '';
  }
  const lastTransaction = callTransactionList[callTransactionList.length - 1];
  return lastTransaction.health_status;
};

const getStyleByPersonStatus = (personStatus) => {
  const personStatusInLoweCase = personStatus.toLowerCase();
  switch (personStatusInLoweCase) {
    case 'recovered':
      return {
        color: '#00A768',
        backgroundColor: '#ECFCF6',
        textAlign: 'center',
        height: '30px',
        paddingTop: '5px',
        display: 'inline-block',
      };
    case 'symptomatic':
      return {
        color: '#A70000',
        backgroundColor: '#FFF0F1',
        textAlign: 'center',
        height: '30px',
        paddingTop: '5px',
        display: 'inline-block',
      };
    case 'deceased':
      return {
        color: '#555555',
        backgroundColor: '#EFF0F2',
        textAlign: 'center',
        height: '30px',
        paddingTop: '5px',
        display: 'inline-block',
      };
    case 'urgent':
      return {
        color: '#A70000',
        backgroundColor: '#FFF0F1',
        textAlign: 'center',
        height: '30px',
        paddingTop: '5px',
        display: 'inline-block',
      };
    case 'quarantined':
      return {
        color: '#0B1A89',
        backgroundColor: '#EBF5FF',
        textAlign: 'center',
        height: '30px',
        paddingTop: '5px',
        display: 'inline-block',
      };
    default:
      return {};
  }
};

const getPersonStatusText = (personCallTransactions) => {
  const personStatus = getCurrentPersonStatus(personCallTransactions);
  switch (personStatus) {
    case 'quarantined':
      return 'Quarantine';
    case 'symptomatic':
      return 'Symptomatic';
    case 'recovered':
      return 'Recovered';
    case 'deceased':
      return 'Deceased';
    case 'urgent':
      return 'Urgent';
    default:
      return '';
  }
};

function renderTextFieldForAddress(
  label,
  key,
  basicDetails,
  handleOnChange,
  styles,
  multilineRequired = false,
  idx = null,
  calledBy,
  source = null,
  sourceKey = null,
) {
  const maxLengthProp = key === 'pinCode' ? { maxLength: 6 } : {};
  return (
    <TextField
      className={'traveller-information-' + key + ' ' + styles.textField}
      label={label}
      id={key}
      inputProps={maxLengthProp}
      value={jsonPath({
        flatten: true,
        json: source !== null ? source : basicDetails,
        path: sourceKey !== null ? sourceKey : key,
        wrap: false,
      })}
      multiline={multilineRequired}
      onChange={(event) => handleOnChange(event, key, 'text', idx, calledBy)}
      autoComplete="off"
      margin={'normal'}
      variant={'outlined'}
    />
  );
}

function renderTextField(label, key, travellerInformation, handleOnChange, styles, multilineRequired = false, idx = null) {
  const typeOfInput = ['age', 'pinCode', 'familyMembersCount'].includes(key) ? 'number' : 'text';
  const maxLengthProp = ['familyMembersCount', 'age'].includes(key) ? { maxLength: 3 } : {};
  return (
    <TextField
      className={'traveller-information-' + key + ' ' + styles.textField}
      label={label}
      id={key}
      type={typeOfInput}
      inputProps={maxLengthProp}
      value={jsonPath({
        flatten: true,
        json: travellerInformation,
        path: key,
        wrap: false,
      })}
      multiline={multilineRequired}
      onChange={(event) => handleOnChange(event, key, 'text', idx)}
      autoComplete="off"
      margin={'normal'}
      variant={'outlined'}
    />
  );
}

function renderPhoneNumberField(label, key, travellerInformation, handleOnChange, styles, idx = null) {
  //const isRequired = (key === 'secondaryPhoneNumber' || key === 'alternatePhoneNumber') ? false : true;
  return (
    <InputMask
      mask="9999999999"
      maskChar={null}
      value={jsonPath({
        flatten: true,
        json: travellerInformation,
        path: key,
        wrap: false,
      })}
      onChange={(value) => handleOnChange(value, key, 'text', idx)}
    >
      {() => <TextField id={key} variant={'outlined'} className={styles.textField} label={label} />}
    </InputMask>
  );
}

function renderDropDownFieldForAsyncAPICall(
  label,
  key,
  dropdownList,
  addressDetails,
  handleOnChange,
  handleInputValueChange,
  styles,
  matchStyle,
  idx = null,
  calledBy,
  source = null,
  sourceKey = null
) {
  let dropDownValues = dropdownList !== undefined ? dropdownList : [];
  if (key === 'street_name') {
    dropDownValues = dropDownValues.map((dropDownValue) => dropDownValue['street']);
  } else if (key === 'area') {
    dropDownValues = dropDownValues.map((dropDownValue) => dropDownValue['area']);
  }
  return (
    <Autocomplete
      className={'traveller-information-' + key + ' ' + styles.label}
      id={key}
      style={matchStyle}
      options={dropDownValues}
      loadingText={'Loading'}
      classes={{
        option: styles.option,
      }}
      value={jsonPath({
        flatten: true,
        json: source !== null ? source : addressDetails,
        path: sourceKey !== null ? sourceKey : key,
        wrap: false,
      })}
      getOptionLabel={(option) => (option.label !== undefined ? option.label : option)}
      onChange={(event, value) => handleInputValueChange(value, key, 'dropdown', idx, calledBy)}
      onInputChange={(event, value) => {
        handleOnChange(value, key, 'dropdown', idx);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={'outlined'}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
}

function renderDropDownFieldForAddress(
  label,
  key,
  dropdownList,
  travellerInformation,
  handleOnChange,
  styles,
  matchStyle,
  idx = null,
  calledBy,
  source = null,
  sourceKey = null,
) {
  return (
    <Autocomplete
      className={'traveller-information-' + key + ' ' + styles.label}
      id={key}
      style={matchStyle}
      options={dropdownList !== undefined ? dropdownList : []}
      loadingText={'Loading'}
      classes={{
        option: styles.option,
      }}
      value={jsonPath({
        flatten: true,
        json: source !== null ? source : travellerInformation,
        path: sourceKey !== null ? sourceKey : key,
        wrap: false,
      })}
      getOptionLabel={(option) => (option.label !== undefined ? option.label : option)}
      onChange={(event, value) => handleOnChange(value, key, 'dropdown', idx, calledBy)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={'outlined'}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
}

function renderDropDownField(label, key, dropdownList, travellerInformation, handleOnChange, styles, matchStyle, idx = null) {
  return (
    <Autocomplete
      className={'traveller-information-' + key + ' ' + styles.label}
      id={key}
      style={matchStyle}
      options={dropdownList !== undefined ? dropdownList : []}
      loadingText={'Loading'}
      classes={{
        option: styles.option,
      }}
      value={jsonPath({
        flatten: true,
        json: travellerInformation,
        path: key,
        wrap: false,
      })}
      getOptionLabel={(option) => (option.label !== undefined ? option.label : option)}
      onChange={(event, value) => handleOnChange(value, key, 'dropdown', idx)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={'outlined'}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
}

function renderRadioButtonField(label, key, radioButtonList, travellerInformation, handleOnChange, styles, idx = null) {
  return (
    <div className={'traveller-information-' + key} style={{ marginRight: '2%' }}>
      <FormLabel style={{ marginTop: '1%' }} component="legend" className={'traveller-information-' + key + '-form-label' + ' ' + styles.radioButton}>
        {label}
      </FormLabel>
      <RadioGroup
        style={{ display: 'inline-block' }}
        value={jsonPath({
          flatten: true,
          json: travellerInformation,
          path: key,
          wrap: false,
        })}
        onChange={(event) => handleOnChange(event, key, 'radioButton', idx)}
      >
        {radioButtonList.map((radioButton, index) => {
          return <FormControlLabel key={index} value={radioButton.value} control={<Radio />} label={radioButton.label} />;
        })}
      </RadioGroup>
    </div>
  );
}

function renderDateField(label, key, dateFormat, type, campaignDetails, handleOnChange, styles, idx = null) {
  if (type === 'date') {
    return (
      <DatePicker
        className={'create-campaign-' + key + '-mui-pickers ' + styles.datePicker}
        key={'create-campaign-' + key + '-mui-pickers-key'}
        id={'create-campaign-' + key + '-mui-pickers'}
        label={label}
        value={
          jsonPath({
            flatten: true,
            json: campaignDetails,
            path: key,
            wrap: false,
          }) !== undefined
            ? jsonPath({
                flatten: true,
                json: campaignDetails,
                path: key,
                wrap: false,
              })
            : null
        }
        onChange={(date) => handleOnChange(date, key, 'date', idx, dateFormat)}
        placeholder="MM/DD/YYYY"
        format={dateFormat}
        inputVariant="outlined"
        clearable
      />
    );
  } else if (type === 'datetime') {
    return (
      <DateTimePicker
        className={'create-campaign-' + key + '-mui-pickers ' + styles.datePicker}
        key={'create-campaign-' + key + '-mui-pickers-key'}
        id={'create-campaign-' + key + '-mui-pickers'}
        label={label}
        value={
          jsonPath({
            flatten: true,
            json: campaignDetails,
            path: key,
            wrap: false,
          }) !== undefined
            ? jsonPath({
                flatten: true,
                json: campaignDetails,
                path: key,
                wrap: false,
              })
            : null
        }
        onChange={(date) => handleOnChange(date, key, 'date', idx, dateFormat)}
        placeholder="MM/DD/YYYY"
        format={dateFormat}
        inputVariant="outlined"
        clearable
      />
    );
  }
}

const matchStyleForDropdown = {
  width: '150px',
  marginRight: '2%',
  display: 'inline-block',
};

const yesNoRadioButton = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

const callFailureReasonRadioButton = [
  { label: 'Call Not Picked', value: 'callNotPicked' },
  { label: 'Incorrect Phone Number', value: 'incorrectPhoneNumber' },
  { label: 'Wrong Number', value: 'wrongNumber' },
];

const personStatusRadioButton = [{ label: 'Quarantine', value: 'quarantined' }];

const genderList = [
  {
    label: 'Male',
    value: 'M',
  },
  {
    label: 'Female',
    value: 'F',
  },
];

const answeredByList = ['Self', 'Family', 'Friends', 'Other'];

const placeTypeList = ['Mall', 'Theater', 'Place Of Worship', 'Market', 'Others'];

const modeOfTravelList = ['Car', 'Bike', 'Public Transport', 'Others'];

const typeOfAddress = ['Apartment', 'Individual House', 'Hospital', 'Others'];

const TravellerInformationComponent = (props) => {
  const styles = useStyles();
  return (
    <div>
      <Dialog
        maxWidth={'lg'}
        open={props.showDialog}
        onClose={props.handleCloseForDialog}
        className={'traveller-information-dialog'}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>
          <div style={{ display: 'inline-block' }} className={styles.heading}>
            Person Information
          </div>
          <div
            style={{
              display: 'inline-block',
              float: 'right',
              fontSize: '14px',
              width: '60%',
            }}
          >
            {props.type === 'UPDATE' ? (
              <div style={{ display: 'inline-block', width: '80%' }}>
                <Typography style={{ display: 'inline-block', marginRight: '5%' }}>
                  {' '}
                  Tracking Since: {formatDateBasedOnFormat(new Date(props.rowData.trackingSince), 'DD-MMM-YYYY')}
                </Typography>
                <Typography style={{ display: 'inline-block', marginRight: '5%' }}>
                  Last Call: {getLastContactedDate(props.rowData.person_call_transactions)}
                </Typography>
                <Typography style={getStyleByPersonStatus(getCurrentPersonStatus(props.rowData.person_call_transactions))}>
                  {getPersonStatusText(props.rowData.person_call_transactions)}
                </Typography>
              </div>
            ) : (
              ''
            )}
            <Button variant="outlined" style={{ border: 'none', float: 'right', padding: '0' }} onClick={props.handleCloseForDialog}>
              <CloseIcon />
            </Button>
          </div>
          <Divider className={styles.personalInformationDivider} />
        </DialogTitle>
        <DialogContent>
          <div>
            {renderTextField('Persons Name', 'name', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
            {renderTextField('Age', 'age', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
            {renderDropDownField(
              'Gender',
              'gender',
              genderList,
              props.basicDetails,
              props.handleOnChangeForBasicDetails,
              styles,
              matchStyleForDropdown,
            )}
            {renderTextField('Passport', 'passport', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
          </div>
          <div style={{ marginTop: '2%' }}>
            {renderPhoneNumberField('Persons Phone Number', 'phoneNumber', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
            {renderPhoneNumberField(
              'Alternate Phone Number',
              'secondaryPhoneNumber',
              props.basicDetails,
              props.handleOnChangeForBasicDetails,
              styles,
            )}
            {renderRadioButtonField(
              'Travelled abroad?',
              'travelledAbroad',
              yesNoRadioButton,
              props.basicDetails,
              props.handleOnChangeForBasicDetails,
              styles,
            )}
          </div>
          <div style={{ marginTop: '2%' }}>
            {props.basicDetails.travelledAbroad === 'Y' ? (
              <div>
                {renderTextField('Country Travelled From', 'countryVisited', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
                {renderDateField(
                  'Date Of Arrival',
                  'dateOfArraival',
                  'DD-MM-YYYY',
                  'date',
                  props.basicDetails,
                  props.handleOnChangeForBasicDetails,
                  styles,
                )}
              </div>
            ) : (
              ''
            )}
          </div>
          <div style={{ marginTop: '2%' }}>
            {renderTextField('Family Members Count', 'familyMembersCount', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
            {renderRadioButtonField(
              'Diabetes Indicator',
              'diabetesIndicator',
              yesNoRadioButton,
              props.basicDetails,
              props.handleOnChangeForBasicDetails,
              styles,
            )}
            {renderRadioButtonField(
              'Hypertension Indicator',
              'hyperTensionIndicator',
              yesNoRadioButton,
              props.basicDetails,
              props.handleOnChangeForBasicDetails,
              styles,
            )}
            {renderTextField('Other Illness', 'otherIllness', props.basicDetails, props.handleOnChangeForBasicDetails, styles)}
          </div>
          <div style={{ marginTop: '2%' }} className={styles.subHeading}>
            Address
            <Divider className={styles.informationDivider} />
            <div style={{ marginTop: '2%' }}>
              {renderDropDownFieldForAddress(
                'Type of Address',
                'type',
                typeOfAddress,
                props.basicDetails,
                props.handleAddressFieldsOnValueChange,
                styles,
                matchStyleForDropdown,
                null,
                'Basic Details',
                props.basicDetails.address,
                'type',
              )}
              {renderTextFieldForAddress(
                'Flat/Home Number and Floor',
                'numberAndFloor',
                props.basicDetails,
                props.handleAddressFieldsOnValueChange,
                styles,
                false,
                null,
                'Basic Details',
                props.basicDetails.address,
                'numberAndFloor'
              )}
              {renderDropDownFieldForAsyncAPICall(
                'Street',
                'street_name',
                props.locationDetails !== undefined ? props.locationDetails.locations : [],
                props.basicDetails,
                props.handleAddressFieldChanges,
                props.handleAddressFieldsOnValueChange,
                styles,
                matchStyleForDropdown,
                null,
                'Basic Details',
                props.basicDetails.address,
                'street',
              )}
              {renderDropDownFieldForAsyncAPICall(
                'Area',
                'area',
                props.locationDetails !== undefined ? props.locationDetails.locations : [],
                props.basicDetails,
                props.handleAddressFieldChanges,
                props.handleAddressFieldsOnValueChange,
                styles,
                matchStyleForDropdown,
                null,
                'Basic Details',
                props.basicDetails.address,
                'area',
              )}
              {renderTextFieldForAddress(
                'City',
                'city',
                props.basicDetails,
                props.handleAddressFieldsOnValueChange,
                styles,
                false,
                null,
                'Basic Details',
                props.basicDetails.address,
                'city'
              )}
              <div style={{ marginTop: '2%' }}>
                {renderTextFieldForAddress(
                  'State',
                  'state',
                  props.basicDetails,
                  props.handleAddressFieldsOnValueChange,
                  styles,
                  false,
                  null,
                  'Basic Details',
                  props.basicDetails.address,
                  'state'
                )}
                {renderTextFieldForAddress(
                  'Pin Code',
                  'pinCode',
                  props.basicDetails,
                  props.handleAddressFieldsOnValueChange,
                  styles,
                  false,
                  null,
                  'Basic Details',
                  props.basicDetails.address,
                  'pinCode'
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2%' }}>
            {renderTextField('Remarks', 'remarks', props.basicDetails, props.handleOnChangeForBasicDetails, styles, true)}
          </div>

          <div style={{ marginTop: '2%' }} className={styles.subHeading}>
            Person Traceability
            <Divider className={styles.informationDivider} />
            <div style={{ marginTop: '2%' }}>
              {renderPhoneNumberField('Phone Number', 'phoneNumber', props.callDetails, props.handleOnChangeForCallDetails, styles)}
              {renderDropDownField(
                'Answered By',
                'answeredBy',
                answeredByList,
                props.callDetails,
                props.handleOnChangeForCallDetails,
                styles,
                matchStyleForDropdown,
              )}
            </div>
            <div style={{ marginTop: '2%' }}>
              {renderRadioButtonField(
                'Is Suspected?',
                'isSuspected',
                yesNoRadioButton,
                props.callDetails,
                props.handleOnChangeForCallDetails,
                styles,
              )}
              {renderRadioButtonField(
                'Is the call Successful?',
                'callSuccessFulIndicator',
                yesNoRadioButton,
                props.callDetails,
                props.handleOnChangeForCallDetails,
                styles,
              )}
              {props.callDetails.callSuccessFulIndicator === 'N'
                ? renderRadioButtonField(
                    'Call Failure Reason',
                    'callFailureReason',
                    callFailureReasonRadioButton,
                    props.callDetails,
                    props.handleOnChangeForCallDetails,
                    styles,
                  )
                : ''}
            </div>
          </div>

          <div style={{ marginTop: '2%' }} className={styles.subHeading}>
            Person Health Details
            <Divider className={styles.informationDivider} />
            <div style={{ marginTop: '2%' }}>
              {renderRadioButtonField(
                'Person Status',
                'healthStatus',
                personStatusRadioButton,
                props.transactionDetails,
                props.handleOnChangeForTransactionDetails,
                styles,
              )}
              {renderTextField('Symptoms', 'symptoms', props.transactionDetails, props.handleOnChangeForTransactionDetails, styles)}
              {renderDateField(
                'Date of First Symptom',
                'dateOfFirstSymptom',
                'DD-MM-YYYY',
                'date',
                props.transactionDetails,
                props.handleOnChangeForTransactionDetails,
                styles,
              )}
              {renderRadioButtonField(
                'Current Address Same as Permanent',
                'currentAddressSame',
                yesNoRadioButton,
                props.transactionDetails,
                props.handleOnChangeForTransactionDetails,
                styles,
              )}
            </div>
            {props.transactionDetails.currentAddressSame === 'N' ? (
              <div style={{ marginTop: '2%' }} className={styles.subHeading}>
                Address
                <Divider className={styles.informationDivider} />
                <div style={{ marginTop: '2%' }}>
                  {renderDropDownFieldForAddress(
                    'Type of Address',
                    'type',
                    typeOfAddress,
                    props.transactionDetails,
                    props.handleAddressFieldsOnValueChange,
                    styles,
                    matchStyleForDropdown,
                    null,
                    'Transaction Details',
                    props.transactionDetails.currentAddress,
                    'type',
                  )}
                  {renderTextFieldForAddress(
                    'Flat/Home Number and Floor',
                    'numberAndFloor',
                    props.transactionDetails,
                    props.handleAddressFieldsOnValueChange,
                    styles,
                    false,
                    null,
                    'Transaction Details',
                    props.transactionDetails.currentAddress,
                    'numberAndFloor',
                  )}
                  {renderDropDownFieldForAsyncAPICall(
                    'Street',
                    'street_name',
                    props.locationDetails !== undefined ? props.locationDetails.locations : [],
                    props.transactionDetails,
                    props.handleAddressFieldChanges,
                    props.handleAddressFieldsOnValueChange,
                    styles,
                    matchStyleForDropdown,
                    null,
                    'Transaction Details',
                    props.transactionDetails.currentAddress,
                    'street',
                  )}
                  {renderDropDownFieldForAsyncAPICall(
                    'Area',
                    'area',
                    props.locationDetails !== undefined ? props.locationDetails.locations : [],
                    props.transactionDetails,
                    props.handleAddressFieldChanges,
                    props.handleAddressFieldsOnValueChange,
                    styles,
                    matchStyleForDropdown,
                    null,
                    'Transaction Details',
                    props.transactionDetails.currentAddress,
                    'area',
                  )}
                  {renderTextFieldForAddress(
                    'City',
                    'city',
                    props.transactionDetails,
                    props.handleAddressFieldsOnValueChange,
                    styles,
                    false,
                    null,
                    'Transaction Details',
                    props.transactionDetails.currentAddress,
                    'city'
                  )}
                  <div style={{ marginTop: '2%' }}>
                    {renderTextFieldForAddress(
                      'State',
                      'state',
                      props.transactionDetails,
                      props.handleAddressFieldsOnValueChange,
                      styles,
                      false,
                      null,
                      'Transaction Details',
                      props.transactionDetails.currentAddress,
                      'state'
                    )}
                    {renderTextFieldForAddress(
                      'Pin Code',
                      'pinCode',
                      props.transactionDetails,
                      props.handleAddressFieldsOnValueChange,
                      styles,
                      false,
                      null,
                      'Transaction Details',
                      props.transactionDetails.currentAddress,
                      'pinCode'
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div>
              <Button
                variant={'outlined'}
                style={{
                  width: '300px',
                  border: 'none',
                  color: '#0084FF',
                  textDecoration: 'underline',
                  justifyContent: 'left',
                  padding: '0',
                  marginTop: '2%',
                }}
                onClick={() => props.handleAddForTravelDetails()}
              >
                Add Travel Details
              </Button>
              {props.travelDetails.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`} className={styles.dynamicFields + ' ' + `${idx}`}>
                    <Button variant="outlined" style={{ border: 'none', float: 'right' }} onClick={() => props.handleRemoveForTravelFields(idx)}>
                      <CloseIcon />
                    </Button>
                    <Typography className={styles.heading} style={{ display: 'inline-block' }}>
                      Travel Details {idx + 1}
                    </Typography>
                    <Divider className={styles.personalInformationDivider} />
                    <div style={{ marginTop: '2%' }}>
                      {renderTextField('Place Of Visit', 'placeOfVisit', field, props.handleChangeForTravelDetailsDynamicFields, styles, false, idx)}
                      {renderDropDownField(
                        'Place Type',
                        'placeType',
                        placeTypeList,
                        field,
                        props.handleChangeForTravelDetailsDynamicFields,
                        styles,
                        matchStyleForDropdown,
                        idx,
                      )}
                      {renderDateField(
                        'Visited Date',
                        'visitedDate',
                        'DD-MM-YYYY HH:mm',
                        'datetime',
                        field,
                        props.handleChangeForTravelDetailsDynamicFields,
                        styles,
                        idx,
                      )}
                      {renderDropDownField(
                        'Mode Of Travel',
                        'modeOfTravel',
                        modeOfTravelList,
                        field,
                        props.handleChangeForTravelDetailsDynamicFields,
                        styles,
                        matchStyleForDropdown,
                        idx,
                      )}
                    </div>
                    <div style={{ marginTop: '2%' }} className={styles.subHeading}>
                      Address
                      <Divider className={styles.informationDivider} />
                      <div style={{ marginTop: '2%' }}>
                        {renderDropDownFieldForAddress(
                          'Type of Address',
                          'type',
                          typeOfAddress,
                          field,
                          props.handleAddressFieldsOnValueChange,
                          styles,
                          matchStyleForDropdown,
                          idx,
                          'Travel Details',
                          field.address,
                          'type',
                        )}
                        {renderTextFieldForAddress(
                          'Flat/Home Number and Floor',
                          'numberAndFloor',
                          field,
                          props.handleAddressFieldsOnValueChange,
                          styles,
                          false,
                          idx,
                          'Travel Details',
                          field.address,
                          'numberAndFloor'
                        )}
                        {renderDropDownFieldForAsyncAPICall(
                          'Street',
                          'street_name',
                          props.locationDetails !== undefined ? props.locationDetails.locations : [],
                          field,
                          props.handleAddressFieldChanges,
                          props.handleAddressFieldsOnValueChange,
                          styles,
                          matchStyleForDropdown,
                          idx,
                          'Travel Details',
                          field.address,
                          'street',
                        )}
                        {renderDropDownFieldForAsyncAPICall(
                          'Area',
                          'area',
                          props.locationDetails !== undefined ? props.locationDetails.locations : [],
                          field,
                          props.handleAddressFieldChanges,
                          props.handleAddressFieldsOnValueChange,
                          styles,
                          matchStyleForDropdown,
                          idx,
                          'Travel Details',
                          field.address,
                          'area',
                        )}
                        {renderTextFieldForAddress(
                          'City',
                          'city',
                          field,
                          props.handleAddressFieldsOnValueChange,
                          styles,
                          false,
                          idx,
                          'Travel Details',
                          field.address,
                          'city'
                        )}
                        <div style={{ marginTop: '2%' }}>
                          {renderTextFieldForAddress(
                            'State',
                            'state',
                            field,
                            props.handleAddressFieldsOnValueChange,
                            styles,
                            false,
                            idx,
                            'Travel Details',
                            field.address,
                            'state'
                          )}
                          {renderTextFieldForAddress(
                            'Pin Code',
                            'pinCode',
                            field,
                            props.handleAddressFieldsOnValueChange,
                            styles,
                            false,
                            idx,
                            'Travel Details',
                            field.address,
                            'pinCode'
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ display: 'inline-block', marginTop: '1%' }}>
              <Button
                variant={'outlined'}
                style={{
                  width: '300px',
                  border: 'none',
                  color: '#0084FF',
                  textDecoration: 'underline',
                  justifyContent: 'left',
                  padding: '0',
                  marginTop: '2%',
                }}
                onClick={() => props.handleAddForContractedFields()}
              >
                Add Contracted Persons
              </Button>
            </div>
            {props.contractedFields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`} className={styles.dynamicFields + ' ' + `${idx}`}>
                  <Typography className={styles.heading} style={{ display: 'inline-block' }}>
                    Contracted Person {idx + 1}
                  </Typography>
                  <Button variant="outlined" style={{ border: 'none', float: 'right' }} onClick={() => props.handleRemoveForContractedFields(idx)}>
                    <CloseIcon />
                  </Button>
                  <Divider className={styles.personalInformationDivider} />
                  <div style={{ marginTop: '2%' }}>
                    {renderTextField('Persons Name', 'name', field, props.handleChangeForContractedPersonsDynamicFields, styles, false, idx)}
                    {renderTextField('Age', 'age', field, props.handleChangeForContractedPersonsDynamicFields, styles, false, idx)}
                    {renderDropDownField(
                      'Gender',
                      'gender',
                      genderList,
                      field,
                      props.handleChangeForContractedPersonsDynamicFields,
                      styles,
                      matchStyleForDropdown,
                      idx,
                    )}
                  </div>
                  <div style={{ marginTop: '2%' }}>
                    {renderPhoneNumberField(
                      'Persons Phone Number',
                      'phoneNumber',
                      field,
                      props.handleChangeForContractedPersonsDynamicFields,
                      styles,
                      idx,
                    )}
                    {renderPhoneNumberField(
                      'Alternate Phone Number',
                      'alternatePhoneNumber',
                      field,
                      props.handleChangeForContractedPersonsDynamicFields,
                      styles,
                      idx,
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <Button variant="contained" style={{ width: '300px', marginTop: '2%' }} onClick={props.handleSave}>
            SUBMIT
          </Button>
            {props.showError ?  <Typography style={{ paddingLeft: '35px', marginTop: '3%', color: 'red', fontWeight: 'bold', fontSize: '15px'}}>Please fill in all details to Submit</Typography> : ''}
          </div>
        </DialogContent>
      </Dialog>
      {props.addContractedPersonError !== '' && props.addContractedPersonError !== undefined ? (
        <ToastComponent
          toastMessage={'Error while saving data. Please try later...'}
          openToast={props.addContractedPersonError !== ''}
          handleClose={props.handleToastClose}
          toastVariant={'error'}
        />
      ) : (
        ''
      )}
    </div>
  );
};

TravellerInformationComponent.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
  type: PropTypes.string,
  basicDetails: PropTypes.object,
  callDetails: PropTypes.object,
  transactionDetails: PropTypes.object,
  travelDetails: PropTypes.array,
  contractedFields: PropTypes.array,
  handleOnChangeForBasicDetails: PropTypes.func,
  handleOnChangeForCallDetails: PropTypes.func,
  handleOnChangeForTransactionDetails: PropTypes.func,
  handleChangeForTravelDetailsDynamicFields: PropTypes.func,
  handleChangeForContractedPersonsDynamicFields: PropTypes.func,
  handleAddForTravelDetails: PropTypes.func,
  handleAddForContractedFields: PropTypes.func,
  handleRemoveForTravelFields: PropTypes.func,
  handleRemoveForContractedFields: PropTypes.func,
  handleAddressFieldChanges: PropTypes.func,
  handleSave: PropTypes.func,
  locationDetails: PropTypes.any,
  handleAddressFieldsOnValueChange: PropTypes.func,
  addContractedPersonError: PropTypes.string,
  handleToastClose: PropTypes.func,
  showError: PropTypes.bool
};

export default TravellerInformationComponent;
