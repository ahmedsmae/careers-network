import { createMuiTheme, colors } from '@material-ui/core';
const { red, orange, blue } = colors;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: blue[500],
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

export default theme;
