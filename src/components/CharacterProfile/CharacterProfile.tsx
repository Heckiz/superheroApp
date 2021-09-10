import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const CharacterProfile: FC<{
  uri: string | undefined;
  name: string | undefined;
  width: number;
  height: number;
  fontSize: number;
}> = ({uri, name, width, height, fontSize}) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={[styles.picture, {width: width, height: height}]}
        source={{uri: uri}}
      />
      <Text style={[styles.nameTitle, {width: width, fontSize: fontSize}]}>
        {name}
      </Text>
    </View>
  );
};
export const styles = StyleSheet.create({
  profileContainer: {
    marginHorizontal: 2,
  },
  picture: {
    top: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  nameTitle: {
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
