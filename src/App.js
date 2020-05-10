import React, { useState } from 'react';
import './App.css';
import { titleConstants } from './utils/constants';
import HeaderComponent from './components/HeaderComponent';
import DashboardContainer from './containers/DashboardContainer';
import TravellerInformationContainer from './containers/TravallerInformationContainer';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const [showDialog, setShowDialog] = useState(false);
  const [type, setType] = useState('ADD');
  const [rowData, setRowData] = useState(undefined);

  const handleOpenForDialog = (type, rowData) => {
    setShowDialog(true);
    setType(type);
    setRowData(rowData);
  };

  const handleCloseForDialog = () => {
    setShowDialog(false);
    setType('ADD');
    setRowData(undefined);
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
      <DashboardContainer selectedTab={selectedTab} handleOpenForDialog={handleOpenForDialog} />
      <TravellerInformationContainer
        showDialog={showDialog}
        handleCloseForDialog={handleCloseForDialog}
        type={type}
        rowData={rowData}
      />
    </div>
  );
}

export default App;
