import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 30,
    height: 100,
    textAlignVertical: 'center'
  },
  searchInput: {
    margin: 10,
    backgroundColor: 'white',
    width: '80%',
    fontSize: 22
  },
  searchButton: {
    marginTop: 20
  },
  signIn: {
    marginTop: 70,
    color: 'blue',
    padding: 10
  }
});
