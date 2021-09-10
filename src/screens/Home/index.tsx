import React, {FC} from 'react';
import {Text, View} from 'react-native';
import CharacterProfile from '../../components/CharacterProfile/CharacterProfile';
import PowerStats from '../../components/SuperheroCard/PowerStats/PowerStats';
import {useAppSelector} from '../../hooks/store';
import styles from './styles';
const Home: FC = () => {
  const {myTeam} = useAppSelector(state => state.superheros);

  return (
    <View>
      <View style={styles.charactersList}>
        {myTeam.goods.map((character, index) => (
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
        ))}
      </View>

      <View style={styles.charactersList}>
        {myTeam.bads.map((character, index) => (
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
        ))}
      </View>

      <View>
        <Text style={styles.title}>Total Stats</Text>
        <PowerStats powerstats={myTeam.totalStats} />
      </View>
    </View>
  );
};

export default Home;
