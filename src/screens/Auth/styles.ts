import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgoundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    color: '#1c1e21',
    fontSize: 27,
    fontWeight: 'bold',
    textShadowColor: 'teal',
    textShadowRadius: 1,
    textTransform: 'uppercase',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'teal',
    marginBottom: 30,
  },
  formContent: {
    padding: 25,
    borderRadius: 5,
    width: '80%',
    margin: 5,
    backgroundColor: '#F7F9F9',
  },
  input: {
    backgroundColor: '#1c1e21',
    color: 'white',
    padding: 10,
    margin: 2,
    borderRadius: 7,
    fontSize: 18,
  },
  textError: {
    fontSize: 10,
    color: '#fa5035',
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
  submitContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  submitButton: {
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: 'teal',
    borderRadius: 7,
    color: 'white',
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 40,
    fontWeight: 'bold',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  navText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  navLink: {
    color: 'teal',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    borderColor: 'teal',
    borderBottomWidth: 2,
  },
});

export default styles;
