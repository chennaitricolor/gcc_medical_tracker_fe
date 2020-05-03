import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TravellerInformationContainer from "../containers/TravallerInformationContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#F7F7F7'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: '#707070',
        fontWeight: 'bold',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        marginLeft: 0,
        width: '200px',
        boxShadow: '0px 3px 6px #7C7C7C29',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    filterSelect: {
        paddingLeft: '10px',
        marginLeft: '10px',
        width: '160px',
        height: '35px',
        position: 'relative',
        boxShadow: '0px 3px 6px #7C7C7C29',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: theme.shape.borderRadius,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        paddingLeft: '10px',
        transition: theme.transitions.create('width'),
        width: '150px',
    },
}));

const PatientsListHeaderComponent = (props) => {
    const classes = useStyles();
    const [age, setAge] = useState(0);
    const { handleSearchTextChange, handleFilterChange } = props;
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title}>
                        Patients List
                    </Typography>
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Search Patient"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchTextChange}
                        />
                            <SearchIcon style={{paddingTop: '10px'}}/>
                    </div>
                    <div>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                label="Filter"
                                disableUnderline
                                IconComponent = {KeyboardArrowDownIcon}
                                onChange={handleFilterChange}
                                className={classes.filterSelect}
                            >
                                <MenuItem disabled value={0}>Filter</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                    </div>
                </Toolbar>
                <TravellerInformationContainer/>
            </AppBar>
        </div>
    );
}

PatientsListHeaderComponent.propTypes = {
    handleSearchTextChange: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
}

export default PatientsListHeaderComponent;
