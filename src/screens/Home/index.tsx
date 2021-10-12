import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  changeTeam,
  removeCharacter,
  switchEditable,
} from '../../app/slices/superheros/superheroSlice';
import CharacterProfile from '../../components/CharacterProfile/CharacterProfile';
import PowerStats from '../../components/SuperheroCard/PowerStats/PowerStats';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';

const Home: FC = () => {
  const {myTeams} = useAppSelector(state => state.superheros);

  const {teamSelected} = myTeams;

  const team = myTeams[teamSelected];
  console.log('teamSelected:', teamSelected);
  const dispatch = useAppDispatch();

  return (
    <View>
      <View style={styles.charactersList}>
        {team.goods.map((character, index) => (
          <View key={`good${index}`}>
            {character && myTeams.editable && (
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
        {team.bads.map((character, index) => (
          <View key={`bad${index}`}>
            {character && myTeams.editable && (
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
          <PowerStats powerstats={team.totalStats} />
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => dispatch(switchEditable())}
            style={[
              styles.optionButton,
              myTeams.editable && styles.buttonSelected,
            ]}>
            <Icon name="edit" size={35} />
          </TouchableOpacity>
          <Picker
            dropdownIconColor="white"
            dropdownIconRippleColor="white"
            style={styles.picker}
            selectedValue={teamSelected}
            onValueChange={itemValue => dispatch(changeTeam(itemValue))}>
            <Picker.Item
              style={styles.pickerItem}
              label="Team A"
              value="teamA"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="Team B"
              value="teamB"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="Team C"
              value="teamC"
            />
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default Home;
