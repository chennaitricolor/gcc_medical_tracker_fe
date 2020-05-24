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
  //const personsByWard = useSelector((state) => state.getPersonsByWardReducer);
  const [searchText, setSearchText] = useState('');


  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = () => {};

/*  const getElementsToRender = () => {
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
            wardsList={props.wards}
            handleWardSelection={props.handleWardSelection}
            selectedWard={props.selectedWard}
            handleFilterChange={handleFilterChange}
            handleSearchTextChange={handleSearchTextChange}
            searchText={searchText}
          />
        </div>
      );
    }
  }; */


  return (<div>
    <DetailedStatsByZoneComponent
        wardsList={props.wards}
        handleWardSelection={props.handleWardSelection}
        selectedWard={props.selectedWard}
        handleFilterChange={handleFilterChange}
        handleSearchTextChange={handleSearchTextChange}
        handleOpenForDialog={props.handleOpenForDialog}
        searchText={searchText}
    />
  </div>);
};

DetailedStatsByZoneContainer.propTypes = {
  wards: PropTypes.any,
  selectedWard: PropTypes.any
};

export default DetailedStatsByZoneContainer;
