import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderColor: 'teal',
    padding: 5,
  },
  charactersList: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  options: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionButton: {
    backgroundColor: 'orange',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#E74C3C',
  },
  buttonSelected: {
    borderColor: '#52BE80',
  },
  buttonRemove: {
    position: 'absolute',
    backgroundColor: '#E74C3C',
    zIndex: 3,
    borderRadius: 100,
    padding: 5,
    top: 1,
    right: 0,
  },
});

export default styles;
