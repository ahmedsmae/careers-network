import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1
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
  locationListContainer: {
    width: '90%',
    elevation: 10
  },
  locationsList: {
    backgroundColor: 'lightgrey',
    width: '100%',
    maxHeight: 200,
    overflow: 'hidden',
    borderRadius: 5
  },
  locationListItem: {
    padding: 5,
    margin: 5,
    elevation: 11
  },
  searchButton: {
    marginTop: 30
  },
  signIn: {
    marginVertical: 50,
    textAlign: 'center'
  },
  contacts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  contact: {
    color: 'grey'
  }
});
