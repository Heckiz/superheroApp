import React, {Dispatch, FC, useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {fetchSuperheros} from '../../app/slices/superheros/superheroSlice';
import {useAppDispatch} from '../../hooks/store';
import useDebounce from '../../hooks/useDebounce';

const SearchBar: FC<{
  placeholder: string;
  setSearching: Dispatch<boolean>;
}> = ({placeholder, setSearching}) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const dispatch = useAppDispatch();

  const debouncedSearchTerm: string = useDebounce<string>(searchWord, 500);

  useEffect(() => {
    dispatch(fetchSuperheros(`search/${debouncedSearchTerm}`));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={text => {
        text.length > 0 ? setSearching(true) : setSearching(false);
        setSearchWord(text);
      }}
    />
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
});

export default SearchBar;
