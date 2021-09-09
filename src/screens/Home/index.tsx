import React, {FC, useState} from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import {useAppSelector} from '../../app/hooks';
import SearchBar from '../../components/SearchBar/SearchBar';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import {Props} from '../../navigation/types';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import RandomList from '../../components/RandomList/RandomList';
import DetailModal from '../../components/DetailModal/DetailModal';

const Home: FC<Props> = ({navigation}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const {superheros, loading, error, modal} = useAppSelector(
    state => state.superheros,
  );
  console.log('data:', superheros, 'loading:', loading, 'error:', error);
  return (
    <>
      <TouchableOpacity style={styles.searchBar}>
        <Icon name="search1" size={28} color="white" />

        <SearchBar placeholder="Search Superhero" setSearching={setSearching} />
        {loading && <Icon name="loading1" size={28} color="white" />}
      </TouchableOpacity>

      {!searching ? (
        <RandomList />
      ) : (
        <FlatList
          data={superheros}
          renderItem={({item}) => <SuperherCard character={item} />}
          keyExtractor={item => item.id}
        />
      )}
      <DetailModal modalVisible={modal.visible} character={modal.character} />
      <TouchableOpacity
        style={styles.teamsButton}
        onPress={() => navigation.navigate('Teams')}>
        <Text style={styles.teamsButtonText}>My team</Text>
      </TouchableOpacity>
    </>
  );
};
export default Home;
