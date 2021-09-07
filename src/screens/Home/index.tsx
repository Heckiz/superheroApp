import React, {FC, useState} from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from '../../app/hooks';
import SearchBar from '../../components/SearchBar/SearchBar';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import {Props} from '../../navigation/types';
import styles from './styles';

const Home: FC<Props> = ({navigation}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const {superheros, loading, error} = useAppSelector(
    state => state.superheros,
  );
  console.log('data:', superheros, 'loading:', loading, 'error:', error);
  return (
    <>
      <SafeAreaView>
        <TouchableOpacity style={styles.searchBar}>
          <SearchBar
            placeholder="Search Superhero"
            setSearching={setSearching}
          />
        </TouchableOpacity>

        {searching && <Text>searching...</Text>}
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
