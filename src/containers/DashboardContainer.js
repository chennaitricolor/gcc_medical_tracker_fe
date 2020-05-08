import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import StatsComponent from '../components/StatsComponent';
import actions from '../actions/GetZonesAction';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
import DetailedStatsByZoneContainer from "./DetailedStatsByZoneContainer";


const loadingComponentStyle = {
    top: '40%',
    position: 'absolute',
    left: '42%',
    color: '#0084FF',
    width: '50px',
};

const DashboardContainer = (props) => {
    const { selectedTab } = props;
    const dispatch = useDispatch();
    const getAllZones = useSelector(state => state.getAllZonesReducer);
    const [selectedZone, setSelectedZone] = useState('');
    const [wards, setWards] = useState([]);


    useEffect(() => {
        dispatch({
            type: actions.GET_ALL_ZONE,
        });
    }, []);

    const handleZoneSelectionChange = (event, value) => {
        const zoneNumber = event.target.value.split(' ')[1];
        setSelectedZone(event.target.value);
        const allZones = (getAllZones !== undefined && getAllZones.allZones !== undefined && getAllZones.allZones.success) ?
            getAllZones.allZones.zones : [];
        const wardsBasedOnZoneNumber = allZones.find(zoneItem => zoneItem.zone === parseInt(zoneNumber));
         const wards = (wardsBasedOnZoneNumber !== undefined) ? wardsBasedOnZoneNumber.ward.split(','): [];
         setWards(wards);

    }

    const getZonesList = () => {
        return (getAllZones !== undefined && getAllZones.allZones !== undefined && getAllZones.allZones.success) ?
            getAllZones.allZones.zones : [];
    }


    const getElementsToRender = () => {
        const getZonesResponse = getAllZones;
        if((getZonesResponse !== undefined && getZonesResponse.isLoading)) {
            return <LoadingComponent isLoading={getZonesResponse.isLoading} style={loadingComponentStyle} />;
        }
        else {
            return(<div>
                {(getZonesResponse !== undefined && getZonesResponse.allZonesError !== '') ? (<Alert style={{fontWeight: 'bold', justifyContent: 'center'}} severity={'error'}>Error connecting to server.. Please try later..</Alert>) : (<div />)}
                <StatsComponent liveCampaignsCount={1} totalEntriesCount={0} zonesList={getZonesList()} onZoneSelectionChange={handleZoneSelectionChange} selectedZone={selectedZone}/>
               <DetailedStatsByZoneContainer wards={wards} />
            </div>);
        }

    };

    if(selectedTab === 0) {
        return getElementsToRender();
    }
    else if(selectedTab === 1)
        return  (<h1>Reports Page - In Progress</h1>)

};

DashboardContainer.propTypes = {
    selectedTab: PropTypes.number.isRequired
};

export default DashboardContainer;