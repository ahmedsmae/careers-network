import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import 'typeface-roboto';
import appTheme from './app.theme';
import useStyles from './app.styles';

import HomePage from './pages/home/home.component';

import './app.scss';

function App() {
  useStyles();

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={appTheme}>
        <div className="wrapper">
          <div className="overlay" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
