import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
    table: {
    }
}));

function createData(id, name, age, address, phone, trackingStatus, lastContacted, personStatus) {
    return { id, name, age, address, phone, trackingStatus, lastContacted, personStatus };
}

const rows = [
    createData(1,'John Doe', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Recovered'),
    createData(2, 'John Doe', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Symptomatic'),
    createData(3, 'John Doe', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Deceased'),
    createData(4, 'John Doe', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Urgent'),
    createData(5, 'John Doe', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Quarantine'),
];

const getStyleByPersonStatus = (personStatus) => {
    const personStatusInLoweCase = personStatus.toLowerCase();
    switch(personStatusInLoweCase) {
        case 'recovered':
            return { color: '#00A768', backgroundColor: '#ECFCF6', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px'};
        case 'symptomatic':
            return { color: '#A70000', backgroundColor: '#FFF0F1', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px'};
        case 'deceased':
            return { color: '#555555', backgroundColor: '#EFF0F2', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px'};
        case 'urgent':
            return { color: '#A70000', backgroundColor: '#FFF0F1', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px'};
        case 'quarantine':
            return { color: '#0B1A89', backgroundColor: '#EBF5FF', textAlign: 'center', height: '30px', paddingTop: '5px', width: '91px'};
        default:
            return {}
    }
};

const PatientsListComponent = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{marginLeft: '1%', marginRight: '1%', width: 'auto', marginTop: '2%'}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:'#BABABA'}}>Patients Name</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Age/Sex</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Contact Address</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Phone</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Tracking Since</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Last Contacted</TableCell>
                        <TableCell align="left" style={{color:'#BABABA'}}>Person Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{marginTop: '1%'}}>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.age}</TableCell>
                            <TableCell align="left">{row.address}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.trackingStatus}</TableCell>
                            <TableCell align="left">{row.lastContacted}</TableCell>
                            <TableCell align="left"><div style ={getStyleByPersonStatus(row.personStatus)}>{row.personStatus}</div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

};

export default PatientsListComponent;