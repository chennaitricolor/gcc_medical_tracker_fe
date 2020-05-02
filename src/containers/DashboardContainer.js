import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import StatsComponent from '../components/StatsComponent';
import DetailedStatsByZoneComponent from '../components/DetailedStatsByZoneComponent';
import actions from '../actions/GetZonesAction';

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

    const handleSearchTextChange = () => {

    };

    const handleFilterChange = () => {

    };

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

    if(selectedTab === 0)
        return (<div>
                <StatsComponent liveCampaignsCount={1} totalEntriesCount={25} zonesList={getZonesList()} onZoneSelectionChange={handleZoneSelectionChange} selectedZone={selectedZone}/>
                <DetailedStatsByZoneComponent handleSearchTextChange={handleSearchTextChange} handleFilterChange={handleFilterChange} wardsList={wards}/>
            </div>
            );
    else if(selectedTab === 1)
        return  (<h1>Reports Page - In Progress</h1>)

};

DashboardContainer.propTypes = {
    selectedTab: PropTypes.number.isRequired
};

export default DashboardContainer;