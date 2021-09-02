import React, {FC} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import fetchSuperheros from '../../services/fetchSuperheros';
import styles from './styles';

const Superheros: FC = () => {
  //   const [search, setSearch] = useState<string>('');

  const handleSearch: Function = async (text: string) => {
    const {result} = await fetchSuperheros(`search/${text}`);
    console.log(result);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Search Superhero"
        onChangeText={text => handleSearch(text)}
      />
    </SafeAreaView>
  );
};
export default Superheros;
