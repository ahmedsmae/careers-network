import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20
  },
  header: {
    height: 150,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {},
  footerText: {
    fontSize: 18,
    marginVertical: 10
  },
  footerButton: {
    marginVertical: 10
  }
});
