import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1
  },
  locationListContainer: {
    width: '80%',
    elevation: 10
  },
  locationsList: {
    backgroundColor: 'lightgrey',
    width: '100%',
    maxHeight: 200,
    overflow: 'hidden'
  },
  locationListItem: {
    padding: 5,
    margin: 5,
    elevation: 11
  }
});
