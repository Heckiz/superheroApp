import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchSuperheros} from '../../app/superheroSlice';
import useInterval from '../../hooks/useInterval';
import SuperheroCard from '../SuperheroCard/SuperheroCard';

const RandomList: FC = () => {
  const dispatch = useAppDispatch();

  useInterval(() => {
    const numberRandom: string = (
      Math.floor(Math.random() * 731) + 1
    ).toString();
    dispatch(fetchSuperheros(numberRandom));
  }, 3000);

  const {randomSuperheros} = useAppSelector(state => state.superheros);
  return (
    <FlatList
      data={randomSuperheros}
      renderItem={({item}) => <SuperheroCard character={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RandomList;
