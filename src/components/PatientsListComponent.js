import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    table: {
    }
}));

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
    const { personsList } = props;

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
                    {personsList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Tooltip title={row.name} interactive>
                                    <Typography style={{ float: 'left', width: '120px', textOverflow: 'ellipsis', overflow: 'hidden' }} noWrap>
                                        {row.name}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left">{row.age}</TableCell>
                            <TableCell align="left">
                                <Tooltip title={row.address} interactive>
                                    <Typography style={{ float: 'left', width: '120px', textOverflow: 'ellipsis', overflow: 'hidden' }} noWrap>
                                        {row.address}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
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