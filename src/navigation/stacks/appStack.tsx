import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Teams from '../../screens/Teams';
import {RootStackParamList} from '../types';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const AppStack: FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="Teams" component={Teams} />
    </Navigator>
  );
};

export default AppStack;
