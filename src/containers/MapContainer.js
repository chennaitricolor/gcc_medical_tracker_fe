import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import map from 'lodash/map';
import { MapWrappedComponent } from '../components/MapComponent';
import RedMarkerIcon from '../images/MarkerIcons/Red.png';
import OrangeMarkerIcon from '../images/MarkerIcons/Orange.png';
import YellowMarkerIcon from '../images/MarkerIcons/Yellow.png';

const LegendMapping = {
  '30+ Cases': RedMarkerIcon,
  '20+ Cases': OrangeMarkerIcon,
  '<20 Cases': YellowMarkerIcon,
};

const Legend = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div style={{ position: 'absolute', zIndex: 2, top: '65vh', right: open ? '15px' : 0 }}>
      <Button
        style={{ background: 'white', width: '40px', height: '40px', minWidth: '40px', marginRight: '12px', fontSize: '32px', borderRadius: '2px' }}
        onClick={handleClick}
      >
        <span>&#8505;</span>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div style={{ padding: '1vh' }}>
          {map(LegendMapping, (value, key) => (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}>
              {<img src={value} alt="Red Zone" style={{ height: '35px' }} />} {key}
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export const MapContainer = (props) => {
  const getPatientsLocation = useSelector((state) => state.getPatientsLocationReducer);
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div style={{ height: '95vh' }}>
      {mapLoaded && <Legend />}
      <MapWrappedComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY !== undefined ? process.env.REACT_APP_GOOGLE_KEY : 'AIzaSyDFIVNy3804eaed33ukPN4zUURrJpZFJJY'
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        getPatientsLocation={getPatientsLocation}
        onLoad={() => setMapLoaded(true)}
      />
    </div>
  );
};

export default MapContainer;
