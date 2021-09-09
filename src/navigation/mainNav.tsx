import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './tabs/appTabs';

const MainNav: FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default MainNav;
