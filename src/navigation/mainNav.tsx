import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from './tabs/appTabs';
import {useAppSelector} from '../hooks/store';
import AuthStack from './stacks/authStack';

const MainNav: FC = () => {
  const {logged} = useAppSelector(state => state.auth);
  console.log(logged);
  return (
    <NavigationContainer>
      {!logged ? <AuthStack /> : <AppTabs />}
    </NavigationContainer>
  );
};

export default MainNav;
