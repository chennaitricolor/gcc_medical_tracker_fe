import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import DetailedStatsByZoneComponent from "../components/DetailedStatsByZoneComponent";
import getPersonsByWardActions from "../actions/GetPersonsByWardAction";
import getPersonsByWardReducer from "../reducers/GetPersonsByWardReducer";
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../components/LoadingComponent";
import Alert from "@material-ui/lab/Alert";
import StatsComponent from "../components/StatsComponent";

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

const DetailedStatsByZoneContainer = (props) => {

    const [personsList, setPersonsList] = useState(rows);
    const [selectedWard, setSelectedWard] = useState('');
    const personsByWard = useSelector(state => state.getPersonsByWardReducer);
    const dispatch = useDispatch();

    const handleWardSelection = (event) => {
        setSelectedWard(event);
        dispatch({
            type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
            payload: {
                wardId: event.slice(1)
            }
        });

    };

    const handleSearchTextChange = (event) => {
        //replace rows with personsByWard from reducer
        const filteredPersonsList = event.target.value !== '' && event.target.value.length >= 1 ? (personsList.filter(data => data.name.includes(event.target.value))) : rows;
        setPersonsList(filteredPersonsList);
    };

    const handleFilterChange = () => {

    };

    const getElementsToRender = () => {
        const getPersonsByWard = personsByWard;
        if((getPersonsByWard !== undefined && getPersonsByWard.isLoading)) {
            return <LoadingComponent isLoading={getPersonsByWard.isLoading} style={loadingComponentStyle} />;
        }
        else {
            return(<div>
                {(getPersonsByWard !== undefined && getPersonsByWard.personsByWardError !== '') ? (<Alert style={{fontWeight: 'bold', justifyContent: 'center'}} severity={'error'}>Error connecting to server.. Please try later..</Alert>) : (<div />)}

                <DetailedStatsByZoneComponent handleSearchTextChange={handleSearchTextChange}
                                              handleFilterChange={handleFilterChange} wardsList={props.wards}
                                              handleWardSelection={handleWardSelection} selectedWard={selectedWard} personsList={personsList}/>
            </div>);
        }

    };


    return getElementsToRender();
};

DetailedStatsByZoneContainer.propTypes = {
    wards: PropTypes.any
}

export default DetailedStatsByZoneContainer;