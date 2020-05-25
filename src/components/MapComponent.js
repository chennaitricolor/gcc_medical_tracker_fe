import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useEffect, useState } from 'react';
import _map from 'lodash/map';
import { useDispatch } from 'react-redux';
import actions from '../actions/getPatientsLocation';
import toastActions from '../actions/ToastAction';
import ToastComponent from '../components/ToastComponent';

export const MapWrappedComponent = withScriptjs(
  withGoogleMap((props) => {
    const { patientsLocation, patientsLocationError, isLoading } = props.getPatientsLocation;
    const [selectedEntry, setSelectedEntry] = useState(null);
    const dispatch = useDispatch();

    const handleToastClose = () => {
      dispatch({
        type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
      });
    };

    useEffect(() => {
      dispatch({
        type: actions.GET_PATIENTS_LOCATION,
      });
    }, [dispatch]);

    useEffect(() => {
      const listener = (e) => {
        if (e.key === 'Escape') {
          setSelectedEntry(null);
        }
      };
      window.addEventListener('keydown', listener);

      return () => {
        window.removeEventListener('keydown', listener);
      };
    }, []);

    const getMarkers = () => {
      if (patientsLocation && patientsLocation.result) {
        const locations = patientsLocation.result;
        return _map(locations, (patients, location) => {
          const [lng, lat] = _map(location.split(','), parseFloat);
          return (
            <Marker
              key={location}
              position={{ lat, lng }}
              onClick={() => {
                setSelectedEntry({ coordinates: [lat, lng], patients });
              }}
            />
          );
        });
      } else {
        return '';
      }
    };

    if (!patientsLocation && patientsLocationError && !isLoading) {
      return <ToastComponent toastMessage={patientsLocationError} openToast handleClose={handleToastClose} toastVariant={'error'} />;
    }
    return (
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: 13.0827, lng: 80.2707 }}>
        {getMarkers()}
        {selectedEntry && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedEntry(null);
            }}
            position={{
              lat: selectedEntry.coordinates[0],
              lng: selectedEntry.coordinates[1],
            }}
          >
            <div>
              {selectedEntry.patients.map((patient) => (
                <div style={{ marginBottom: '1vh' }}>
                  <h2 style={{ margin: 0 }}>
                    Patient:{patient.name} ({patient.gender})
                  </h2>
                  <h4 style={{ margin: 0 }}>Phone:{patient.phone}</h4>
                </div>
              ))}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }),
);
