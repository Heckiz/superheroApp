import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/helpers';
import {fetchSuperheros} from '../../app/superheroSlice';
import useInterval from '../../hooks/useInterval';
import SuperheroCard from '../SuperheroCard/SuperheroCard';

const RandomList: FC = () => {
  const dispatch = useAppDispatch();

  const {list, ids} = useAppSelector(
    state => state.superheros.randomSuperheros,
  );

  useInterval(() => {
    const numberRandom: string = (
      Math.floor(Math.random() * 731) + 1
    ).toString();
    if (!ids.includes(numberRandom)) {
      dispatch(fetchSuperheros(numberRandom));
    }
  }, 3000);

  return (
    <FlatList
      data={list}
      renderItem={({item}) => <SuperheroCard character={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RandomList;
