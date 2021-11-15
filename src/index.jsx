import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

import { StylesProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <Router>
    <StylesProvider injectFirst>
      <CssBaseline>
        <App />
      </CssBaseline>
    </StylesProvider>
  </Router>,
  document.getElementById('root')
);
