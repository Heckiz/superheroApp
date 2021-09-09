import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const CharacterProfile: FC<{
  uri: string | undefined;
  name: string | undefined;
  width: number;
  height: number;
}> = ({uri, name, width, height}) => {
  return (
    <View>
      <Image
        style={[styles.picture, {width: width, height: height}]}
        source={{uri: uri}}
      />
      <Text style={styles.nameTitle}>{name}</Text>
    </View>
  );
};
export const styles = StyleSheet.create({
  picture: {
    top: 10,
    borderRadius: 5,
    zIndex: 1,
    alignItems: 'center',
  },
  nameTitle: {
    bottom: 10,
    fontSize: 28,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    zIndex: 2,
  },
});
export default CharacterProfile;
