import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const AuthStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Screen
        name="Register"
        options={{
          headerShown: false,
        }}
        component={Register}
      />
    </Navigator>
  );
};

export default AuthStack;
