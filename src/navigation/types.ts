import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type RootTabParamList = {
  Home: undefined;
  SearchSuperhero: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
};

export type Props = BottomTabScreenProps<RootTabParamList, 'SearchSuperhero'>;
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type DrawerProps = DrawerScreenProps<RootDrawerParamList, 'Home'>;
