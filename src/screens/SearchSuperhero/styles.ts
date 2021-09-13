import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  teamsButton: {
    borderRadius: 100,
    width: 70,
    height: 70,
    backgroundColor: 'teal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  teamsButtonText: {
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default styles;
