import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import { ApiContainer } from './components';

import store from './redux/store';
import appTheme from './app.theme';

import { createRootNavigator } from './navigation/root-navigator';

import { selectCurrentUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';

// Optimize memory usage and performance
// https://reactnavigation.org/docs/en/react-native-screens.html
useScreens();

const App = ({ loadingUserStart, currentUser }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    loadingUserStart(err => {
      if (err) console.log(err);
      Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
      })
        .then(() => setDataLoaded(true))
        .catch(error => console.log(error));
    });
  }, []);

  const Layout = createRootNavigator(currentUser);

  return !dataLoaded ? (
    <AppLoading />
  ) : (
    <>
      <Layout />
      <ApiContainer />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  loadingUserStart: callback => dispatch(loadingUserStart(callback))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => (
  <StoreProvider store={store}>
    <PaperProvider theme={appTheme}>
      <AppContainer />
    </PaperProvider>
  </StoreProvider>
);
