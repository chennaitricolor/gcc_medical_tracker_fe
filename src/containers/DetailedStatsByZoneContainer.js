import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import DetailedStatsByZoneComponent from '../components/DetailedStatsByZoneComponent';
import getPersonsByWardActions from '../actions/GetPersonsByWardAction';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const DetailedStatsByZoneContainer = (props) => {
  const [searchText, setSearchText] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const personsByWard = useSelector((state) => state.getPersonsByWardReducer);
  const dispatch = useDispatch();

  const handleWardSelection = (event) => {
    setSelectedWard(event);
    dispatch({
      type: getPersonsByWardActions.GET_PERSONS_BY_WARD,
      payload: {
        wardId: event.slice(1),
      },
    });
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = () => {};

  const getPersonsByWardFromAPI = (personsByWard) => {
    if (personsByWard.personsByWard !== undefined && personsByWard.personsByWard.success) {
      const personsList = personsByWard.personsByWard.persons;
      return searchText !== ''
        ? personsList.filter(
            (data) =>
              (data.name !== undefined && data.name !== '' && data.name.toLowerCase().includes(searchText.toLowerCase())) ||
              (data.phoneNumber !== undefined && data.phoneNumber !== '' && data.phoneNumber.includes(searchText)),
          )
        : personsList;
    }
    return [];
  };

  const getElementsToRender = () => {
    const getPersonsByWard = personsByWard;
    if (getPersonsByWard !== undefined && getPersonsByWard.isLoading) {
      return <LoadingComponent isLoading={getPersonsByWard.isLoading} style={loadingComponentStyle} />;
    } else {
      return (
        <div>
          {getPersonsByWard !== undefined && getPersonsByWard.personsByWardError !== '' ? (
            <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
              Error connecting to server.. Please try later..
            </Alert>
          ) : (
            <div />
          )}

          <DetailedStatsByZoneComponent
            handleSearchTextChange={handleSearchTextChange}
            handleFilterChange={handleFilterChange}
            wardsList={props.wards}
            handleWardSelection={handleWardSelection}
            selectedWard={selectedWard}
            personsList={getPersonsByWardFromAPI(personsByWard)}
            onRowClick={onRowClick}
          />
        </div>
      );
    }
  };

  const onRowClick = (event, rowData) => {
    dispatch({
      type: 'GET_PERSONS_DETAILS',
      payload: {
        personId: rowData.person_identifier,
      },
    });
    props.handleOpenForDialog('UPDATE', rowData);
  };

  return getElementsToRender();
};

DetailedStatsByZoneContainer.propTypes = {
  wards: PropTypes.any,
};

export default DetailedStatsByZoneContainer;
