import React, {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch} from '../../app/hooks';
import {closeModal} from '../../app/superheroSlice';
import {Result} from '../../interfaces/superheros';
import Icon from 'react-native-vector-icons/AntDesign';

const DetailModal: FC<{modalVisible: boolean; character: Result | null}> = ({
  modalVisible,
  character,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => dispatch(closeModal())}>
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => dispatch(closeModal())}>
          <Icon name="closecircleo" size={35} color="white" />
        </TouchableOpacity>

        <Image
          style={styles.backgroundTop}
          blurRadius={10}
          source={{uri: character?.image.url}}
        />

        <Pressable onPress={() => dispatch(closeModal())}>
          <Image style={styles.picture} source={{uri: character?.image.url}} />
          <Text style={styles.nameTitle}>{character?.name}</Text>
        </Pressable>

        <ScrollView style={styles.dataContainer}>
          {character != null ? (
            Object.entries(character.biography).map(([key, value], index) => (
              <View key={index} style={styles.biography}>
                <Text style={styles.textKey}>{key.replace('-', ' ')}: </Text>

                {key === 'aliases' ? (
                  <View style={styles.textValue}>
                    {value.map((alias: string) => (
                      <Text style={styles.textValue}>
                        {alias === '-' ? alias : `"${alias}"`}{' '}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.textValue}>{value}</Text>
                )}
              </View>
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 22,
  },
  backgroundTop: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  picture: {
    top: 10,
    width: 230,
    height: 230,
    borderRadius: 5,
    zIndex: 1,
    alignItems: 'center',
  },
  nameTitle: {
    width: 230,

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
  dataContainer: {
    width: '100%',
    backgroundColor: '#1c1e21',
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  biography: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#F0B27A',
  },
  textKey: {
    textTransform: 'uppercase',
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  textValue: {
    flex: 2,
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#ebeced',
  },
  buttonClose: {
    position: 'absolute',
    backgroundColor: '#E74C3C',
    zIndex: 3,
    borderRadius: 100,
    padding: 8,
    top: -15,
    right: -15,
  },
});

export default DetailModal;
