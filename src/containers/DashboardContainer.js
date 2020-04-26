import React from 'react';
import * as PropTypes from 'prop-types';

const DashboardContainer = (props) => {
    const { selectedTab } = props;

    if(selectedTab === 0)
        return (<h1>Pipeline page - WIP</h1>);
    else if(selectedTab === 1)
        return  (<h1>Reports Page - WIP</h1>)

};

DashboardContainer.propTypes = {
    selectedTab: PropTypes.number.isRequired
};

export default DashboardContainer;