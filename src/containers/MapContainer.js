import { useSelector } from 'react-redux';
import { MapWrappedComponent } from '../components/MapComponent';
import React from 'react';

export const MapContainer = (props) => {
  const getPatientsLocation = useSelector((state) => state.getPatientsLocationReducer);

  return (
    <div style={{ height: '95vh' }}>
      <MapWrappedComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY !== undefined ? process.env.REACT_APP_GOOGLE_KEY : 'AIzaSyDFIVNy3804eaed33ukPN4zUURrJpZFJJY'
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        getPatientsLocation={getPatientsLocation}
      />
    </div>
  );
};

export default MapContainer;
