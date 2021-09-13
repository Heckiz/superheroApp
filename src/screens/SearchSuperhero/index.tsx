import React, {FC, useState} from 'react';
import {FlatList} from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import RandomList from '../../components/RandomList/RandomList';
import DetailModal from '../../components/DetailModal/DetailModal';
import {useAppSelector} from '../../hooks/store';

const SearchSuperhero: FC = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const {superheros, loading, modal} = useAppSelector(
    state => state.superheros,
  );
  return (
    <>
      <SearchBar
        placeholder="Search Superhero"
        setSearching={setSearching}
        loading={loading}
      />

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
    </>
  );
};
export default SearchSuperhero;
