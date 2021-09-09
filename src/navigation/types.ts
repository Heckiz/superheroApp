import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  SearchSuperhero: undefined;
};

export type Props = BottomTabScreenProps<RootTabParamList, 'SearchSuperhero'>;
