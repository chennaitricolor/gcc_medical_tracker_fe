import React, { useState } from 'react';
import './App.css';
import {titleConstants} from './utils/constants';
import HeaderComponent from "./components/HeaderComponent";
import DashboardContainer from "./containers/DashboardContainer";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  console.log('title', titleConstants);

  return (
      <div>
        <HeaderComponent title={titleConstants.dashboardTitle}
                     selectedTab={selectedTab}
                     handleTabChange={handleTabChange}
        />
        <DashboardContainer selectedTab={selectedTab}/>
      </div>
  );
}

export default App;

