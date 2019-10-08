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
  positionSearchInput: {
    margin: 10,
    backgroundColor: 'white',
    width: '80%',
    fontSize: 22
  },
  locationInputContainer: {
    margin: 10,
    width: '80%',
    flexDirection: 'row'
  },
  locationSearchInput: {
    backgroundColor: 'white',
    flex: 1,
    fontSize: 22
  },
  clearButton: {
    textAlignVertical: 'center',
    fontSize: 30,
    padding: 10,
    marginLeft: 10,
    color: 'lightgrey'
  },
  searchButton: {
    marginTop: 20
  },
  signIn: {
    marginVertical: 70,
    color: 'blue',
    padding: 10
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
    // position: 'absolute',
    // top: 0,
    // left: 0
  },
  locationListItem: {
    padding: 5,
    margin: 5,
    elevation: 11
  },
  contacts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  contact: {
    color: 'grey',
    padding: 10
  }
});
