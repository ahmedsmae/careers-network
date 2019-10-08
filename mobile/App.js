import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';

import store from './redux/store';
import appTheme from './app.theme';

import RootNavigation from './navigation/root-navigator';
import { loadingUserStart } from './redux/current-user/current-user.actions';
// import { init } from './helpers/db';

useScreens();

// init()
//   .then(() => {
//     console.log('Initialized database');
//   })
//   .catch(err => {
//     console.log('Initializing db failed.');
//     console.log(err);
//   });

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const App = ({ loadingUserStart }) => {
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

  return <RootNavigation />;
};

const mapDispatchToProps = dispatch => ({
  loadingUserStart: () => dispatch(loadingUserStart())
});

const AppContainer = connect(
  null,
  mapDispatchToProps
)(App);

export default () => (
  <StoreProvider store={store}>
    <PaperProvider theme={appTheme}>
      <AppContainer />
    </PaperProvider>
  </StoreProvider>
);
