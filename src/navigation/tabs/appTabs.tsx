import React, {FC} from 'react';
import Home from '../../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../types';
import SearchSuperhero from '../../screens/SearchSuperhero';
import Icon from 'react-native-vector-icons/Foundation';

const {Navigator, Screen} = createBottomTabNavigator<RootTabParamList>();

const AppTabs: FC = () => {
  return (
    <Navigator>
      <Screen
        name="Home"
        options={{
          title: 'Teams',
          tabBarIcon: () => <Icon name="torsos-all" size={35} />,
        }}
        component={Home}
      />
      <Screen
        name="SearchSuperhero"
        options={{
          title: 'Search Hero',
          tabBarIcon: () => <Icon name="page-search" size={30} />,
        }}
        component={SearchSuperhero}
      />
    </Navigator>
  );
};

export default AppTabs;
