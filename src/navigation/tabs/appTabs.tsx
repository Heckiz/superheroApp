import React, {FC} from 'react';
import Home from '../../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../types';
import SearchSuperhero from '../../screens/SearchSuperhero';
import Icon from 'react-native-vector-icons/Foundation';
import {useAppSelector} from '../../hooks/store';
import Profile from '../../screens/Profile';

const {Navigator, Screen} = createBottomTabNavigator<RootTabParamList>();

const AppTabs: FC = () => {
  const {ids} = useAppSelector(state => state.superheros.myTeam);

  const badge = ids.length === 6 ? 'FULL' : `${ids.length}/6`;
  return (
    <Navigator>
      <Screen
        name="Home"
        options={{
          tabBarBadge: badge,
          title: 'Teams',
          tabBarIcon: () => <Icon name="torsos-all" size={35} />,
        }}
        component={Home}
      />
      <Screen
        name="SearchSuperhero"
        options={{
          title: 'Search Hero',
          tabBarIcon: () => <Icon name="magnifying-glass" size={30} />,
        }}
        component={SearchSuperhero}
      />
      <Screen
        name="Profile"
        options={{
          title: 'Setting',
          tabBarIcon: () => <Icon name="widget" size={30} />,
        }}
        component={Profile}
      />
    </Navigator>
  );
};

export default AppTabs;
