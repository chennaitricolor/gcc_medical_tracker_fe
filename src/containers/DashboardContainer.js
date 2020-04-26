import React from 'react';
import * as PropTypes from 'prop-types';
import StatsComponent from '../components/StatsComponent';
import DetailedStatsByZoneComponent from '../components/DetailedStatsByZoneComponent';

const DashboardContainer = (props) => {
    const { selectedTab } = props;

    if(selectedTab === 0)
        return (<div>
                <StatsComponent liveCampaignsCount={1} totalEntriesCount={25} />
                <DetailedStatsByZoneComponent/>
            </div>
            );
    else if(selectedTab === 1)
        return  (<h1>Reports Page - WIP</h1>)

};

DashboardContainer.propTypes = {
    selectedTab: PropTypes.number.isRequired
};

export default DashboardContainer;