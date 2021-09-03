import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Teams: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, 'Teams'>;
