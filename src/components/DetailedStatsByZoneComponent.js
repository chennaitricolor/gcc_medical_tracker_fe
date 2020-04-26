import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import PatientsListHeaderComponent from "./PatientsListHeaderComponent";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PatientsListComponent from "./PatientsListComponent";

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '3%',
        marginTop: '2%',
        marginLeft: '3%',
        height: '650px',
    },
    grid: {
        height: '100%',
        borderRight: '2px solid #00000029',
        borderRadius: '10px',
        boxShadow: '0px 3px 6px #00000029',
        background: '#F7F7F7 0% 0% no-repeat padding-box'
    },
    titleCard: {
        height: '8%',
        boxShadow: 'unset',
        borderRadius: 'unset',
        paddingTop: '5px'
    },
    paper: {
        padding: '0 16px 0 16px',
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        height: '92%',
        overflow: 'auto',
        boxShadow: 'unset',
        borderRadius: 'unset',
    },
    wardStatsLabel: {
        textAlign: 'left',
        paddingTop: '15px',
        color: '#707070',
        paddingLeft: '20px'
    },
    campaignDurationLabel: {
        color: '#707070',
        font: 'Medium 20px/26px Roboto;',
        textAlign: 'left',
        float: 'right',
    },
    card: {
        maxWidth: '200px',
        height: '270px',
        margin: '5px',
    },
    media: {
        height: 200,
    },
    button: {
        padding: '0px',
    },
    selectedListItem: { paddingLeft: '0px', color: '#0084FF !important', fontWeight: 'bold' },
    unSelectedItem: { paddingLeft: '0px' },
}));

export const DetailedStatsByZoneComponent = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={3} className={classes.grid}>
                    <Card className={classes.titleCard}>
                        <Typography color="textSecondary" className={classes.wardStatsLabel}>
                            Person List by Ward
                        </Typography>
                    </Card>
                    <Paper className={classes.paper}>
                        <List>
                            <ListItem
                                key={1}
                                role={undefined}
                                button
                                className={classes.selectedListItem}
                                selected={true}
                            >
                                <ListItemText
                                    id={1}
                                    primary={
                                        <Typography style={{ float: 'left', paddingLeft: '10px' }}>{'W1 - Kargil Nagar'}</Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem
                                key={2}
                                role={undefined}
                                button
                                className={classes.unSelectedItem}
                                selected={false}
                            >
                                <ListItemText
                                    id={2}
                                    primary={
                                        <Typography style={{ float: 'left', paddingLeft: '10px' }}>{'W2 - Shanmugapuram extn'}</Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem
                                key={3}
                                role={undefined}
                                button
                                className={classes.unSelectedItem}
                                selected={false}
                            >
                                <ListItemText
                                    id={3}
                                    primary={
                                        <Typography style={{ float: 'left', paddingLeft: '10px' }}>{'W3 - Sample Nagar'}</Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9} className={classes.grid}>
                    <PatientsListHeaderComponent/>
                    <PatientsListComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default DetailedStatsByZoneComponent;
