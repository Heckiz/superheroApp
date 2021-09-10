import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {fetchSuperheros} from '../../app/slices/superheros/superheroSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import useInterval from '../../hooks/useInterval';
import SuperheroCard from '../SuperheroCard/SuperheroCard';

const RandomList: FC = () => {
  const dispatch = useAppDispatch();

  const {randomSuperheros, modal} = useAppSelector(state => state.superheros);

  useInterval(
    () => {
      const numberRandom: string = (
        Math.floor(Math.random() * 731) + 1
      ).toString();
      if (!randomSuperheros.ids.includes(numberRandom)) {
        dispatch(fetchSuperheros(numberRandom));
      }
    },
    modal.visible ? null : 4000,
  );

  return (
    <FlatList
      data={randomSuperheros.list}
      renderItem={({item}) => <SuperheroCard character={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RandomList;
