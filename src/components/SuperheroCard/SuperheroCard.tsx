import React, {FC, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  addSuperhero,
  openModal,
} from '../../app/slices/superheros/superheroSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {Result} from '../../interfaces/superheros';
import PowerStats from '../PowerStats/PowerStats';
import Icon from 'react-native-vector-icons/AntDesign';
import CharacterProfile from '../CharacterProfile/CharacterProfile';

const SuperheroCard: FC<{character: Result}> = ({character}) => {
  const dispatch = useAppDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  (() =>
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      duration: 500,
      toValue: 1,
    }).start())();
  (() =>
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      duration: 500,
      toValue: 1,
    }).start())();

  const {myTeams} = useAppSelector(state => state.superheros);

  const {teamSelected} = myTeams;
  const team = myTeams[teamSelected];

  const verifyTeam = team.ids.includes(character.id);
  const verifyGoods = team.goods.includes(null);
  const verifyBads = team.bads.includes(null);

  let borderColor: string = '',
    backgroundColor: string = '',
    verifyAligment: boolean = false;

  character.biography.alignment === 'good'
    ? (borderColor = '#52BE80') &&
      (backgroundColor = '#52BE80') &&
      (verifyAligment = verifyGoods)
    : character.biography.alignment === 'bad'
    ? (borderColor = '#EC7063') &&
      (backgroundColor = '#EC7063') &&
      (verifyAligment = verifyBads)
    : (borderColor = '#5DADE2') && (backgroundColor = '#5DADE2');

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => dispatch(openModal(character))}>
        <View style={[styles.profile, {backgroundColor: backgroundColor}]}>
          <CharacterProfile
            name={character.name}
            uri={character.image.url}
            height={110}
            width={90}
            fontSize={12}
          />
        </View>

        <View style={[styles.info, {borderColor: borderColor}]}>
          <PowerStats
            powerstats={character.powerstats}
            total={true}
            herosCount={1}
          />

          <View style={styles.addCharacter}>
            {!verifyTeam && verifyAligment && (
              <TouchableOpacity
                onPress={() => dispatch(addSuperhero(character))}>
                <Icon name="plussquare" size={40} color="green" />
              </TouchableOpacity>
            )}
            {verifyTeam && (
              <TouchableOpacity
                style={styles.characterAdded}
                onPress={() => dispatch(addSuperhero(character))}>
                <Icon name="checkcircle" size={40} color="green" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden',
  },
  profile: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backgroundEvil: {
    backgroundColor: '#EC7063',
  },
  backgroundNeutro: {
    backgroundColor: '#5DADE2',
  },
  backgroundGood: {
    backgroundColor: '#52BE80',
  },
  picture: {
    width: 100,
    height: 100,
  },
  title: {
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 4,
    marginTop: 5,
    padding: 5,
    fontSize: 12,
  },
  info: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 6,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderColor: '#444950',
    borderBottomRightRadius: 10,
  },
  addCharacter: {
    justifyContent: 'center',
  },
  characterAdded: {
    justifyContent: 'center',
    opacity: 0.5,
  },
});

export default SuperheroCard;
