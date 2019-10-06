import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';

import store from './redux/store';
import appTheme from './app.theme';

import RootNavigation from './navigation/root-navigator';
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

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   });
// };

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //     />
  //   );
  // }

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={appTheme}>
        <RootNavigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
