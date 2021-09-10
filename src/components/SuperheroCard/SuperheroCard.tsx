import React, {FC} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addSuperhero, openModal} from '../../app/superheroSlice';
import {Result} from '../../interfaces/superheros';
import PowerStats from './PowerStats/PowerStats';

const SuperheroCard: FC<{character: Result}> = ({character}) => {
  const dispatch = useAppDispatch();
  const {myTeam} = useAppSelector(state => state.superheros);
  const verifyTeam = myTeam.ids.indexOf(character.id);
  return (
    <Pressable
      style={styles.container}
      onPress={() => dispatch(openModal(character))}>
      <View
        style={[
          styles.profile,
          character.biography.alignment === 'good'
            ? styles.backgroundGood
            : styles.backgroundEvil,
        ]}>
        <Text style={styles.title}>{character.name}</Text>
        <Image style={styles.picture} source={{uri: character.image.url}} />
      </View>

      <View style={styles.info}>
        <PowerStats powerstats={character.powerstats} />
      </View>

      {verifyTeam === -1 && (
        <TouchableOpacity
          style={styles.addCharacter}
          onPress={() => dispatch(addSuperhero(character))}>
          <Icon name="plussquare" size={50} color="green" />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    margin: 5,
  },
  profile: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: 'center',
  },
  backgroundEvil: {
    backgroundColor: 'red',
  },

  backgroundGood: {
    backgroundColor: 'green',
  },
  picture: {
    width: 100,
    height: 100,
  },
  title: {
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'teal',
    borderRadius: 4,
    marginTop: 5,
    padding: 5,
    fontSize: 12,
  },
  info: {
    flex: 1.7,
  },
  addCharacter: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default SuperheroCard;
