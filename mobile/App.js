import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';

import store from './redux/store';
import appTheme from './app.theme';

import { createRootNavigator } from './navigation/root-navigator';

import { selectCurrentUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';

useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const App = ({ loadingUserStart, currentUser }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadingUserStart();
  }, [loadingUserStart]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  const Layout = createRootNavigator(currentUser);
  return <Layout />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  loadingUserStart: () => dispatch(loadingUserStart())
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default () => (
  <StoreProvider store={store}>
    <PaperProvider theme={appTheme}>
      <AppContainer />
    </PaperProvider>
  </StoreProvider>
);
