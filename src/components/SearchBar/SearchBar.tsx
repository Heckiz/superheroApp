import React, {Dispatch, FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {fetchSuperheros} from '../../app/slices/superheros/superheroSlice';
import {useAppDispatch} from '../../hooks/store';
import useDebounce from '../../hooks/useDebounce';
import Icon from 'react-native-vector-icons/AntDesign';

const SearchBar: FC<{
  placeholder: string;
  setSearching: Dispatch<boolean>;
  loading: boolean;
}> = ({placeholder, setSearching, loading}) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const dispatch = useAppDispatch();

  const debouncedSearchTerm: string = useDebounce<string>(searchWord, 500);

  useEffect(() => {
    dispatch(fetchSuperheros(`search/${debouncedSearchTerm}`));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <TouchableOpacity style={styles.searchBar}>
      <Icon name="search1" size={25} color="white" />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => {
          text.length > 0 ? setSearching(true) : setSearching(false);
          setSearchWord(text);
        }}
      />
      {loading && <ActivityIndicator size="small" color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 20,
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    margin: 15,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#18191a',
    borderRadius: 10,
  },
});

export default SearchBar;
