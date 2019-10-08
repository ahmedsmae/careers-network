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
    borderColor: 'grey',
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
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)'
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  }
});
