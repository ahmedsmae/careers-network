import { DefaultTheme } from 'react-native-paper';

const appTheme = {
  ...DefaultTheme,
  // here you can get the access tochange the default theme
  // https://github.com/callstack/react-native-paper/blob/master/src/styles/DefaultTheme.tsx

  colors: {
    ...DefaultTheme.colors,
    primary: '#233540',
    accent: '#F28B66',
    background: '#F2F2F2'
  }
};

export default appTheme;
