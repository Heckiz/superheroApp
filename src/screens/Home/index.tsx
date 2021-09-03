import React, {FC} from 'react';
import {TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchSuperheros} from '../../app/superheroSlice';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import styles from './styles';

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const {superheros} = useAppSelector(state => state.superheros);
  console.log(superheros);
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Search Superhero"
        onChangeText={text => dispatch(fetchSuperheros(`search/${text}`))}
      />
      <FlatList
        data={superheros}
        renderItem={({item}) => <SuperherCard character={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default Home;
