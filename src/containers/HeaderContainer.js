import React from 'react';
import HeaderComponent from '../components/HeaderComponent';


const HeaderContainer = (props) => {
    const { selectedTab, handleTabChange, title} = props;
    return (<HeaderComponent handleTabChange={handleTabChange} selectedTab={selectedTab} title={title} />);
};

export default HeaderContainer;
