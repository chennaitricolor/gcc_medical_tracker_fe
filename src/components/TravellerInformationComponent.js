import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import Autocomplete from '@material-ui/lab/Autocomplete';
import jsonPath from 'jsonpath-plus';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

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
    marginRight: '2%',
    marginTop: '1%',
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
    marginTop: '1%',
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
    marginTop: '2%',
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
    '.traveller-information-visitedHospital': {
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

const genderList = ['Male', 'Female'];

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
    case 'quarantine':
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

function renderTextField(label, key, travellerInformation, handleOnChange, styles, multilineRequired = false, idx = null) {
  return (
    <TextField
      className={'traveller-information-' + key + ' ' + styles.textField}
      label={label}
      id={key}
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
  return (
    <div className={styles.phoneNumber}>
      <FormLabel style={{ marginTop: '1%' }} component="legend" className={'traveller-information-' + key}>
        {label}
      </FormLabel>
      <MuiPhoneNumber
        className={styles.phoneNumberField}
        defaultCountry={'in'}
        countryCodeEditable={false}
        onChange={(value) => handleOnChange(value, key, 'phoneNumber', idx)}
        value={jsonPath({
          flatten: true,
          json: travellerInformation,
          path: key,
          wrap: false,
        })}
      />
    </div>
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
    <div className={'traveller-information-' + key} style={{ marginTop: '1%', marginRight: '2%' }}>
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

function renderDateField(label, key, campaignDetails, handleOnChange, styles, idx = null) {
  return (
    <DatePicker
      className={'create-campaign-' + key + '-mui-pickers ' + styles.datePicker}
      key={'create-campaign-' + key + '-mui-pickers-key'}
      id={'create-campaign-' + key + '-mui-pickers'}
      label={label}
      value={jsonPath({
        flatten: true,
        json: campaignDetails,
        path: key,
        wrap: false,
      })}
      onChange={(date) => handleOnChange(date, key, 'date', idx)}
      disablePast
      placeholder="MM/DD/YYYY"
      format={'MM/DD/YYYY'}
      inputVariant="outlined"
      clearable
    />
  );
}

const matchStyleForDropdown = {
  width: '150px',
  marginTop: '1%',
  display: 'inline-block',
};

const matchStyleForCountryDropdown = {
  width: '300px',
  marginTop: '1%',
  display: 'inline-block',
};

const yesNoRadioButton = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const callFailureReasonRadioButton = [
  { label: 'Call Not Picked', value: 'callNotPicked' },
  { label: 'Wrong Number', value: 'wrongNumber' },
  { label: 'Not Reachable', value: 'notReachable' },
];

const personStatusRadioButton = [
  { label: 'Symptomatic', value: 'symptomatic' },
  { label: 'Quarantine', value: 'quarantine' },
  { label: 'Recovered', value: 'recovered' },
];

const personCurrentlyStayingRadioButton = [
  { label: 'Home/Hotel - Quarantine', value: 'home' },
  { label: 'Hospital', value: 'hospital' },
  { label: 'Travel(Other Locations)', value: 'travel' },
];

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
              width: '50%',
            }}
          >
            <Typography style={{ display: 'inline-block', marginRight: '5%' }}> Tracking Since: {'12 Mar 2020'}</Typography>
            <Typography style={{ display: 'inline-block', marginRight: '5%' }}>Last Call: {'10 Apr 2020'}</Typography>
            <Typography style={getStyleByPersonStatus('URGENT')}>{'URGENT'}</Typography>
            <Button variant="outlined" style={{ border: 'none', float: 'right', padding: '0' }} onClick={props.handleCloseForDialog}>
              <CloseIcon />
            </Button>
          </div>
          <Divider className={styles.personalInformationDivider} />
        </DialogTitle>
        <DialogContent>
          <div>
            {renderTextField('Persons First Name', 'firstName', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderTextField('Last Name', 'lastName', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderTextField('Age', 'age', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderDropDownField(
              'Gender',
              'sex',
              genderList,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
              matchStyleForDropdown,
            )}
          </div>
          <div>
            {renderPhoneNumberField('Persons Phone Number', 'phoneNumber', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderPhoneNumberField(
              'Alternate Phone Number',
              'alternatePhoneNumber',
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            {renderDropDownField(
              'Country Travelled From',
              'countryFrom',
              genderList,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
              matchStyleForCountryDropdown,
            )}
          </div>
          <div style={{ marginTop: '1%' }} className={styles.subHeading}>
            Person Traceability
            <Divider className={styles.informationDivider} />
            {renderRadioButtonField(
              'Is the call Successful?',
              'callSuccessful',
              yesNoRadioButton,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            {props.travellerInformationResponse.callSuccessful === 'no'
              ? renderRadioButtonField(
                'Call Failure Reason',
                'callFailureReason',
                callFailureReasonRadioButton,
                props.travellerInformationResponse,
                props.handleOnChange,
                styles,
              )
              : ''}
          </div>
          <div style={{ marginTop: '1%' }} className={styles.subHeading}>
            Person Health Details
            <Divider className={styles.informationDivider} />
            {renderRadioButtonField(
              'Person Status',
              'personStatus',
              personStatusRadioButton,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            {renderRadioButtonField(
              'Person Currently Staying in ..',
              'personCurrentlyStaying',
              personCurrentlyStayingRadioButton,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            <div>
              {renderRadioButtonField(
                'Does he/she visited Hospital',
                'visitedHospital',
                yesNoRadioButton,
                props.travellerInformationResponse,
                props.handleOnChange,
                styles,
              )}
              {renderTextField('Hospital Details', 'hospitalDetails', props.travellerInformationResponse, props.handleOnChange, styles)}
              {renderDateField('Date Visited', 'dateVisited', props.travellerInformationResponse, props.handleOnChange, styles)}
            </div>
          </div>
          <div>
            {renderRadioButtonField(
              'Visited Other Place during Quarantine',
              'visitedOtherPlace',
              yesNoRadioButton,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            {renderTextField(
              'Add Notes about the Travel',
              'notesAboutTravel',
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
              true,
            )}
            {renderRadioButtonField(
              'Did he/she travelled using Public transport',
              'travelledUsingPublicTransport',
              yesNoRadioButton,
              props.travellerInformationResponse,
              props.handleOnChange,
              styles,
            )}
            {renderTextField('Travel Details', 'travelDetails', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderDateField('Date', 'dateTravelled', props.travellerInformationResponse, props.handleOnChange, styles)}
            {renderTextField('Add Other Notes', 'otherNotes', props.travellerInformationResponse, props.handleOnChange, styles, true)}
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
                  <div>
                    {renderTextField('Persons First Name', 'firstName', field, props.handleOnChange, styles, false, idx)}
                    {renderTextField('Last Name', 'lastName', field, props.handleOnChange, styles, false, idx)}
                    {renderTextField('Age', 'age', field, props.handleOnChange, styles, false, idx)}
                    {renderDropDownField('Gender', 'sex', genderList, field, props.handleOnChange, styles, matchStyleForDropdown, idx)}
                  </div>
                  <div>
                    <div>
                      {renderPhoneNumberField('Persons Phone Number', 'phoneNumber', field, props.handleOnChange, styles, false, idx)}
                      {renderPhoneNumberField('Alternate Phone Number', 'alternatePhoneNumber', field, props.handleOnChange, styles, idx)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="contained" style={{ width: '300px', marginTop: '2%' }}>
            SUBMIT
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

TravellerInformationComponent.propTypes = {
  showDialog: PropTypes.bool,
  handleCloseForDialog: PropTypes.func,
  travellerInformationResponse: PropTypes.object,
  contractedFields: PropTypes.array,
  handleOnChange: PropTypes.func,
  handleAddForContractedFields: PropTypes.func,
  handleRemoveForContractedFields: PropTypes.func,
};

export default TravellerInformationComponent;
