import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  logout: {
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: '#fa5035',
    borderRadius: 7,
    color: 'white',
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 40,
    fontWeight: 'bold',
  },
});

export default styles;
