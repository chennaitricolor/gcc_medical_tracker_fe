import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import StatsComponent from '../components/StatsComponent';
import DetailedStatsByZoneComponent from '../components/DetailedStatsByZoneComponent';
import actions from '../actions/GetZonesAction';
import getPersonsByWardReducer from "../reducers/GetPersonsByWardReducer";
import getPersonsByWardActions from "../actions/GetPersonsByWardAction";
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';


function createData(id, name, age, address, phone, trackingStatus, lastContacted, personStatus) {
    return { id, name, age, address, phone, trackingStatus, lastContacted, personStatus };
}

const rows = [
    createData(1,'Maalai Sachin', '58/M', '1, Sabari Nagar Extn 1212121212121212', '9884242323', '26-Mar-20', '07-Apr-20', 'Recovered'),
    createData(2, 'Narendran Mohanasundaram', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Symptomatic'),
    createData(3, 'Jegan R', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Deceased'),
    createData(4, 'Riyaz A', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Urgent'),
    createData(5, 'Nandhakumar S', '58/M', '1, Sabari Nagar Extn', '9884242323', '26-Mar-20', '07-Apr-20', 'Quarantine'),
];

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
    const personsByWard = useSelector(state => state.getPersonsByWardReducer);
    const [selectedZone, setSelectedZone] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [personsList, setPersonsList] = useState(rows);


    useEffect(() => {
        dispatch({
            type: actions.GET_ALL_ZONE,
        });
    }, []);

    const handleSearchTextChange = (event) => {
        //replace rows with personsByWard from reducer
        const filteredPersonsList = event.target.value !== '' && event.target.value.length >= 1 ? (personsList.filter(data => data.name.includes(event.target.value))) : rows;
        setPersonsList(filteredPersonsList);
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

    const handleWardSelection = (event) => {
        setSelectedWard(event);
        dispatch({
            type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
            payload: {
                wardId: event.slice(1)
            }
        });

    };


    const getElementsToRender = () => {
        const getZonesResponse = getAllZones;
        const getPersonsByWard = personsByWard;
        if((getZonesResponse !== undefined && getZonesResponse.isLoading) || (getPersonsByWard !== undefined && getPersonsByWard.isLoading)) {
            return <LoadingComponent isLoading={getZonesResponse.isLoading} style={loadingComponentStyle} />;
        }
        else {
            return(<div>
                {(getZonesResponse !== undefined && getZonesResponse.allZonesError !== '') || (getPersonsByWard !== undefined && getPersonsByWard.personsByWardError !== '') ? (<Alert style={{fontWeight: 'bold', justifyContent: 'center'}} severity={'error'}>Error connecting to server.. Please try later..</Alert>) : (<div />)}
                <StatsComponent liveCampaignsCount={1} totalEntriesCount={25} zonesList={getZonesList()} onZoneSelectionChange={handleZoneSelectionChange} selectedZone={selectedZone}/>
                <DetailedStatsByZoneComponent handleSearchTextChange={handleSearchTextChange}
                                              handleFilterChange={handleFilterChange} wardsList={wards}
                                              handleWardSelection={handleWardSelection} selectedWard={selectedWard} personsList={personsList}/>
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