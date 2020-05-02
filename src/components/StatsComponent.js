import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Tooltip } from '@material-ui/core';
import { statsComponentLabels } from '../utils/constants';

const useStyles = makeStyles({
    card: {
        //minWidth: 250,
        width: '200px',
        height: '130px',
        marginLeft: '3%',
        marginTop: '2%',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #00000029',
        display: 'inline-block',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    zonesCard: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#707070',
        marginTop: '20px',
        marginBottom: '25px'
    },
    zoneNameLabel: {
        fontWeight: 'bold',
        color: '#000000',
        textTransform: 'upperCase',
        marginTop: '30px',
        width: '150px',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    contactedCard: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: '#000000',
    },
    notReachableAndMissingCards: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: '#D67C00',
    },
    symptomaticCard: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: '#A70000',
    },
    statsLabel: {
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
    },
});

const options = ['Zone 1', 'Zone 2', 'Zone 3'];


export const StatsComponent = props => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Autocomplete
                        id="zone-select"
                        options={options}
                        getOptionLabel={(option) => option}
                        style={{ width: '70%' }}
                        renderInput={(params) => {

                            return(<TextField {...params} label="Select Zone" InputProps={params.InputProps}/>);
                        }
                        }
                    />
                    <Tooltip title={'TIRUVOTRIYUR'} interactive>
                    <Typography color="textSecondary" className={classes.zoneNameLabel}>
                        TIRUVOTRIYUR
                    </Typography>
                    </Tooltip>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6" className={classes.contactedCard}>
                        {props.totalEntriesCount}
                    </Typography>
                    <Typography color="textSecondary" className={classes.statsLabel}>
                        {statsComponentLabels.contacted}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6" className={classes.notReachableAndMissingCards}>
                        {props.totalEntriesCount}
                    </Typography>
                    <Typography color="textSecondary" className={classes.statsLabel}>
                        {statsComponentLabels.notReachable}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6" className={classes.notReachableAndMissingCards}>
                        {props.totalEntriesCount}
                    </Typography>
                    <Typography color="textSecondary" className={classes.statsLabel}>
                        {statsComponentLabels.dataMissing}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6" className={classes.symptomaticCard}>
                        {props.totalEntriesCount}
                    </Typography>
                    <Typography color="textSecondary" className={classes.statsLabel}>
                        {statsComponentLabels.symptomatic}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

StatsComponent.propTypes = {
    liveCampaignsCount: PropTypes.number,
    totalEntriesCount: PropTypes.number,
};

export default StatsComponent;
