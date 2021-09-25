import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  removeCharacter,
  switchEditable,
} from '../../app/slices/superheros/superheroSlice';
import CharacterProfile from '../../components/CharacterProfile/CharacterProfile';
import PowerStats from '../../components/SuperheroCard/PowerStats/PowerStats';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import styles from './styles';
const Home: FC = () => {
  const {myTeam} = useAppSelector(state => state.superheros);

  const dispatch = useAppDispatch();

  return (
    <View>
      <View style={styles.charactersList}>
        {myTeam.goods.map((character, index) => (
          <View key={`good${index}`}>
            {character && myTeam.editable && (
              <TouchableOpacity
                onPress={() =>
                  character && dispatch(removeCharacter(character))
                }
                style={styles.buttonRemove}>
                <Icon name="closecircleo" size={20} color="white" />
              </TouchableOpacity>
            )}
            <CharacterProfile
              key={index}
              uri={
                character
                  ? character.image.url
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG'
              }
              name={character ? character.name : 'EMPTY'}
              height={120}
              width={110}
              fontSize={10}
            />
          </View>
        ))}
      </View>

      <View style={styles.charactersList}>
        {myTeam.bads.map((character, index) => (
          <View key={`bad${index}`}>
            {character && myTeam.editable && (
              <TouchableOpacity
                onPress={() =>
                  character && dispatch(removeCharacter(character))
                }
                style={styles.buttonRemove}>
                <Icon name="closecircleo" size={20} color="white" />
              </TouchableOpacity>
            )}
            <CharacterProfile
              key={index}
              uri={
                character
                  ? character.image.url
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG'
              }
              name={character ? character.name : 'EMPTY'}
              height={120}
              width={110}
              fontSize={10}
            />
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.title}>Total Stats</Text>
          <PowerStats powerstats={myTeam.totalStats} />
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => dispatch(switchEditable())}
            style={[
              styles.optionButton,
              myTeam.editable && styles.buttonSelected,
            ]}>
            <Icon name="edit" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
