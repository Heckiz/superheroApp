import React, {FC, useState} from 'react';
import {FlatList, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Result} from '../../interfaces/superheros';
import SuperherCard from '../../components/SuperheroCard/SuperheroCard';
import fetchSuperheros from '../../services/fetchSuperheros';
import styles from './styles';

const Home: FC = () => {
  const [search, setSearch] = useState<Result[] | null>(null);

  const handleSearch: Function = async (text: string) => {
    const data = await fetchSuperheros(`search/${text}`);
    setSearch(data.results);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Search Superhero"
        onChangeText={text => handleSearch(text)}
      />
      <FlatList
        data={search}
        renderItem={({item}) => <SuperherCard character={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default Home;
