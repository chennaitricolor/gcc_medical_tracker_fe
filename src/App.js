import React, { useState } from 'react';
import './App.css';
import { titleConstants } from './utils/constants';
import HeaderComponent from './components/HeaderComponent';
import DashboardContainer from './containers/DashboardContainer';
import TravellerInformationContainer from './containers/TravallerInformationContainer';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const [showDialog, setShowDialog] = useState(false);

  const handleOpenForDialog = () => {
    setShowDialog(true);
  };

  const handleCloseForDialog = () => {
    setShowDialog(false);
  };

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  return (
    <div>
      <HeaderComponent
        title={titleConstants.dashboardTitle}
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
        handleOpenForDialog={handleOpenForDialog}
      />
      <DashboardContainer selectedTab={selectedTab} />
      <TravellerInformationContainer showDialog={showDialog} handleCloseForDialog={handleCloseForDialog} type={'ADD'} />
    </div>
  );
}

export default App;
