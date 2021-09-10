import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: undefined;
  SearchSuperhero: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type Props = BottomTabScreenProps<RootTabParamList, 'SearchSuperhero'>;
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
