import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Powerstats} from '../../interfaces/superheros';

const PowerStats: FC<{
  powerstats: Powerstats;
  total: boolean;
  herosCount: number;
}> = ({powerstats, total, herosCount}) => {
  const iconsParam: any = {
    intelligence: 'brain',
    strength: 'fist-raised',
    speed: 'walking',
    power: 'bahai',
    combat: 'fist-raised',
    durability: 'igloo',
  };
  const keys = Object.keys(powerstats);
  const values = Object.values(powerstats);

  return (
    <View style={styles.container}>
      <View>
        {keys.map((key, indexKey) => (
          <View key={indexKey} style={styles.stats}>
            <Icon
              style={styles.icon}
              name={iconsParam[key]}
              size={17}
              color="#444950"
            />
            <Text style={styles.textKey}>{key}:</Text>
          </View>
        ))}
      </View>
      <View>
        {values.map((value, indexValues) => (
          <View key={indexValues} style={styles.stats}>
            <Text style={styles.textValue}>
              {' '}
              {value === 'null' ? 0 : value}
            </Text>
            <Icon
              style={styles.icon}
              name={
                (total ? value / herosCount : value) > 80
                  ? 'arrow-up'
                  : (total ? value / herosCount : value) > 40
                  ? 'arrow-right'
                  : 'arrow-down'
              }
              size={15}
              color={
                (total ? value / herosCount : value) > 80
                  ? '#228b22'
                  : (total ? value / herosCount : value) > 40
                  ? '#daa520'
                  : '#dc143c'
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    display: 'flex',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textKey: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textValue: {
    fontSize: 15,
    fontFamily: 'monospace',
    color: 'teal',
    fontWeight: 'bold',
  },
});

export default PowerStats;
