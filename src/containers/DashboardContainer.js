import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import StatsComponent from '../components/StatsComponent';
import actions from '../actions/GetZonesAction';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
import DetailedStatsByZoneContainer from './DetailedStatsByZoneContainer';
import getPersonsByWardActions from '../actions/GetPersonsByWardAction';
import ReportComponent from '../components/ReportComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const DashboardContainer = (props) => {
  const { selectedTab, handleOpenForDialog } = props;
  const dispatch = useDispatch();

  const getAllZones = useSelector((state) => state.getAllZonesReducer);

  const [selectedZone, setSelectedZone] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_ZONE,
    });
  }, [dispatch]);

  useEffect(() => {
    if (getAllZones !== undefined) {
      if (getAllZones.allZones !== undefined && getAllZones.allZones.zones !== undefined && getAllZones.allZones.zones.length > 0) {
        const zoneNumber = getAllZones.allZones.zones[0].zone;
        const wardsBasedOnZoneNumber = getAllZones.allZones.zones.find((zoneItem) => zoneItem.zone === zoneNumber);
        const wards = wardsBasedOnZoneNumber !== undefined ? wardsBasedOnZoneNumber.ward.split(',') : [];
        setSelectedZone(zoneNumber);
        setWards(wards);
        setSelectedWard(wards[0]);
        dispatch({
          type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
          payload: {
            wardId: wards[0],
          },
        });
      }
    }
  }, [dispatch, getAllZones]);

  const handleZoneSelectionChange = (event, value) => {
    const zoneNumber = event.target.value;
    setSelectedZone(event.target.value);
    const allZones =
      getAllZones !== undefined && getAllZones.allZones !== undefined && getAllZones.allZones.success ? getAllZones.allZones.zones : [];
    const wardsBasedOnZoneNumber = allZones.find((zoneItem) => zoneItem.zone === zoneNumber);
    const wards = wardsBasedOnZoneNumber !== undefined ? wardsBasedOnZoneNumber.ward.split(',') : [];
    setWards(wards);
  };

  const getZonesList = () => {
    return getAllZones !== undefined && getAllZones.allZones !== undefined && getAllZones.allZones.success ? getAllZones.allZones.zones : [];
  };

  const handleWardSelection = (event) => {
    setSelectedWard(event);
    dispatch({
      type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
      payload: {
        wardId: event,
      },
    });
  };

  const getElementsToRender = () => {
    const getZonesResponse = getAllZones;
    if (getZonesResponse !== undefined && getZonesResponse.isLoading) {
      return <LoadingComponent isLoading={getZonesResponse.isLoading} style={loadingComponentStyle} />;
    } else {
      return (
        <div>
          {getZonesResponse !== undefined && getZonesResponse.allZonesError !== '' ? (
            <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
              Error connecting to server.. Please try later..
            </Alert>
          ) : (
            <div />
          )}
          <StatsComponent
            liveCampaignsCount={1}
            totalEntriesCount={0}
            zonesList={getZonesList()}
            onZoneSelectionChange={handleZoneSelectionChange}
            selectedZone={selectedZone}
          />
          <DetailedStatsByZoneContainer
            wards={wards}
            handleOpenForDialog={handleOpenForDialog}
            selectedWard={selectedWard}
            handleWardSelection={handleWardSelection}
          />
        </div>
      );
    }
  };

  if (selectedTab === 0) {
    return getElementsToRender();
  } else if (selectedTab === 1) {
    return <ReportComponent />;
  } else if (selectedTab === 2) {
    return <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '10%', textTransform: 'uppercase' }}>Map View is in Progress</div>;
  }
};

DashboardContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};

export default DashboardContainer;
