import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDateBasedOnFormat } from '../utils/GeneralUtils';
import { useDispatch, useSelector } from 'react-redux';
import getPersonsByWardActions from '../actions/GetPersonsByWardAction';
import LoadingComponent from './LoadingComponent';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  table: {},
  personDetailsRow: {
    cursor: 'pointer',
  },
}));

const infiniteScrollStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  height: '600px',
};

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
  maxHeight: '90%',
};

const getStyleByPersonStatus = (personStatus) => {
  const personStatusInLoweCase = personStatus.toLowerCase();
  switch (personStatusInLoweCase) {
    case 'recovered':
      return { color: '#00A768', backgroundColor: '#ECFCF6', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px' };
    case 'symptomatic':
      return { color: '#A70000', backgroundColor: '#FFF0F1', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px' };
    case 'deceased':
      return { color: '#555555', backgroundColor: '#EFF0F2', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px' };
    case 'urgent':
      return { color: '#A70000', backgroundColor: '#FFF0F1', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px' };
    case 'quarantined':
      return { color: '#0B1A89', backgroundColor: '#EBF5FF', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px' };
    default:
      return {};
  }
};

const PatientsListComponent = (props) => {
  const classes = useStyles();
  const { searchText } = props;
  const [showLoadingComponent, setShowLoadingComponent] = useState(true);

  const personsByWard = useSelector((state) => state.getPersonsByWardReducer);
  const dispatch = useDispatch();

  const getPersonsByWardFromAPI = (personsByWard) => {
    if (personsByWard.personsByWard !== undefined && personsByWard.personsByWard.success) {
      const personsList = personsByWard.allEntries;
      return searchText !== ''
        ? personsList.filter(
            (data) =>
              (data.name !== undefined && data.name !== '' && data.name.toLowerCase().includes(searchText.toLowerCase())) ||
              (data.phone_number !== undefined && data.phone_number !== '' && data.phone_number.includes(searchText)),
          )
        : personsList;
    }
    return [];
  };

  const onRowClick = (event, rowData) => {
    dispatch({
      type: 'GET_PERSONS_DETAILS',
      payload: {
        personId: rowData.person_identifier,
      },
    });
    props.handleOpenForDialog('UPDATE', rowData);
  };

  const loadMore = () => {
    setShowLoadingComponent(false);
    dispatch({
      type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
      payload: {
        wardId: props.selectedWard,
        offset: personsByWard.offset,
      },
    });
  };

  const getCurrentAddress = (address) => {
    const street = address.street !== null ? address.street + ',' : '';
    const area = address.area !== null ? address.area + ',' : '';
    const city = address.city !== null ? address.city + ',' : '';
    const state = address.state !== null ? address.state + ',' : '';
    const pinCode = address.pinCode !== null ? address.pinCode : '';
    return street + area + city + state + pinCode;
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

  const getElementsToRender = () => {
    const getPersonsByWard = personsByWard;
    const personsList = getPersonsByWardFromAPI(personsByWard);
    const totalCount =
      personsByWard !== undefined && personsByWard.personsByWard !== undefined && personsByWard.personsByWard.count
        ? personsByWard.personsByWard.count
        : 0;
    const allEntriesLength = personsByWard !== undefined && personsByWard.allEntries !== undefined ? personsByWard.allEntries.length : 0;
    if (getPersonsByWard !== undefined && getPersonsByWard.isLoading && showLoadingComponent) {
      return <LoadingComponent isLoading={getPersonsByWard.isLoading} style={loadingComponentStyle} />;
    } else {
      return (
        <div>
          {getPersonsByWard !== undefined && getPersonsByWard.personsByWardError !== '' ? (
            <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
              Error connecting to server.. Please try later..
            </Alert>
          ) : (
            <div />
          )}
          <InfiniteScroll
            dataLength={allEntriesLength}
            next={loadMore}
            hasMore={totalCount > allEntriesLength}
            loader={<div>Loading....</div>}
            //scrollableTarget="scrollableDiv"
            style={infiniteScrollStyle}
            height={600}
            useWindow={false}
          >
            {getPatientsDataInfiniteScroll(personsList)}
          </InfiniteScroll>
        </div>
      );
    }
  };

  const getPatientsDataInfiniteScroll = (personsList) => {
    return (
      <TableContainer
        component={Paper}
        // id="scrollableDiv"
        style={{ marginLeft: '1%', marginRight: '1%', marginTop: '2%' }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#BABABA' }}>Patients Name</TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Age/Sex
              </TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Contact Address
              </TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Phone
              </TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Tracking Since
              </TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Last Contacted
              </TableCell>
              <TableCell align="left" style={{ color: '#BABABA' }}>
                Person Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ marginTop: '1%' }}>
            {personsList.map((row, index) => (
              <TableRow className={classes.personDetailsRow} key={index} onClick={(event) => onRowClick(event, row)}>
                <TableCell component="th" scope="row">
                  <Tooltip title={row.name} interactive>
                    <Typography style={{ float: 'left', width: '120px', textOverflow: 'ellipsis', overflow: 'hidden' }} noWrap>
                      {row.name}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">{row.age + '/' + row.gender}</TableCell>
                <TableCell align="left">
                  <Tooltip title={getCurrentAddress(row.currentAddress)} interactive>
                    <Typography style={{ float: 'left', width: '120px', textOverflow: 'ellipsis', overflow: 'hidden' }} noWrap>
                      {getCurrentAddress(row.currentAddress)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{formatDateBasedOnFormat(new Date(row.trackingSince), 'DD-MMM-YYYY')}</TableCell>
                <TableCell align="left">{getLastContactedDate(row.person_call_transactions)}</TableCell>
                <TableCell align="left">
                  <div style={getStyleByPersonStatus(getCurrentPersonStatus(row.person_call_transactions))}>
                    {getPersonStatusText(row.person_call_transactions)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

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
  return getElementsToRender();
};

PatientsListComponent.propTypes = {
  selectedWard: PropTypes.any,
  searchText: PropTypes.any,
  handleOpenForDialog: PropTypes.func,
};

export default PatientsListComponent;
