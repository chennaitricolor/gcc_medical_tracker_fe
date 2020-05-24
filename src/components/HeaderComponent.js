import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { headerTabsTitle } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tabs: {
    flexGrow: 20,
  },
  tabTitle: {
    fontSize: '18px',
  },
  title: {
    flexGrow: 1,
    color: '#0084FF',
    fontWeight: 'bold',
    fontSize: '20px',
    letterSpacing: '0px',
    opacity: 1,
  },
}));

const buttonStyle = {
  fontWeight: 'bold',
  fontSize: '15px',
  width: '15%',
};

export const HeaderComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: '48px' }}>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Tabs className={classes.tabs} value={props.selectedTab} indicatorColor="secondary" onChange={props.handleTabChange}>
            <Tab className={classes.tabTitle} label={headerTabsTitle.pipeline} />
            <Tab className={classes.tabTitle} label={headerTabsTitle.reports} />
            <Tab className={classes.tabTitle} label={headerTabsTitle.mapView} />
          </Tabs>
          <Button style={buttonStyle} variant={'contained'} color="secondary" onClick={() => props.handleOpenForDialog('ADD', null)}>
            ADD CONTRACTED
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  handleOpenForDialog: PropTypes.func,
};

export default HeaderComponent;
