import React, {FC} from 'react';
import {TextInput, FlatList, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchSuperheros} from '../../app/superheroSlice';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import {Props} from '../../navigation/types';
import styles from './styles';

const Home: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {superheros} = useAppSelector(state => state.superheros);
  console.log(superheros);
  return (
    <>
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

      <TouchableOpacity
        style={styles.teamsButton}
        onPress={() => navigation.navigate('Teams')}>
        <Text style={styles.teamsButtonText}>My team</Text>
      </TouchableOpacity>
    </>
  );
};
export default Home;
