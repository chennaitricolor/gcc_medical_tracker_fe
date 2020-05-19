import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    marginBottom: '25px',
  },
  zoneNameLabel: {
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'upperCase',
    marginTop: '20px',
    width: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  zoneCard: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#000000',
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

export const StatsComponent = (props) => {
  const classes = useStyles();

  const getZoneNamesFromProps = (zonesArray) => {
    if (zonesArray !== undefined && zonesArray.length > 0) return zonesArray.map((zoneItem) => zoneItem.zone);
    else return [];
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          {
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.selectedZone}
                style={{ fontWeight: 'bold', marginTop: '30px', marginLeft: '20px' }}
                disableUnderline
                onChange={(event, value) => props.onZoneSelectionChange(event, value)}
              >
                <MenuItem value="Select a Zone" disabled>
                  Select a Zone
                </MenuItem>
                {getZoneNamesFromProps(props.zonesList).map((option) => {
                  return <MenuItem value={option}>{option}</MenuItem>;
                })}
              </Select>
              <Typography color="textSecondary" className={classes.statsLabel} style={{ textAlign: 'center', marginTop: '10px' }}>
                ZONE
              </Typography>
            </div>
          }
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h6" className={classes.contactedCard} style={{ textAlign: 'center' }}>
            {props.totalEntriesCount}
          </Typography>
          <Typography color="textSecondary" className={classes.statsLabel} style={{ textAlign: 'center' }}>
            {statsComponentLabels.contacted}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h6" className={classes.notReachableAndMissingCards} style={{ textAlign: 'center' }}>
            {props.totalEntriesCount}
          </Typography>
          <Typography color="textSecondary" className={classes.statsLabel} style={{ textAlign: 'center' }}>
            {statsComponentLabels.notReachable}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h6" className={classes.notReachableAndMissingCards} style={{ textAlign: 'center' }}>
            {props.totalEntriesCount}
          </Typography>
          <Typography color="textSecondary" className={classes.statsLabel} style={{ textAlign: 'center' }}>
            {statsComponentLabels.dataMissing}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h6" className={classes.symptomaticCard} style={{ textAlign: 'center' }}>
            {props.totalEntriesCount}
          </Typography>
          <Typography color="textSecondary" className={classes.statsLabel} style={{ textAlign: 'center' }}>
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
  zonesList: PropTypes.array,
  onZoneSelectionChange: PropTypes.func.isRequired,
  selectedZone: PropTypes.string,
};

export default StatsComponent;
