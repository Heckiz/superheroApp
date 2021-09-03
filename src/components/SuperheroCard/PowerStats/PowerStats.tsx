import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Powerstats} from '../../../interfaces/superheros';

const PowerStats: FC<{powerstats: Powerstats}> = ({powerstats}) => {
  return (
    <View style={styles.container}>
      {Object.entries(powerstats).map(([key, value], index) => (
        <Text key={index} style={styles.stats}>
          {key}: {value}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  stats: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});

export default PowerStats;
