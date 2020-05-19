import React from 'react';
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
import { formatDateBasedOnFormat } from '../utils/GeneralUtils';

const useStyles = makeStyles(() => ({
  table: {},
  personDetailsRow: {
    cursor: 'pointer',
  },
}));

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
  const { personsList, onRowClick } = props;

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

  return (
    <TableContainer
      component={Paper}
      style={{ marginLeft: '1%', marginRight: '1%', width: 'auto', marginTop: '2%', overflow: 'auto', height: '85%' }}
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

export default PatientsListComponent;
