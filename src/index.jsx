import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

import { StylesProvider } from '@material-ui/core/styles';
import AuthProvider from './components/Contexts/AuthContext';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Router>
    <StylesProvider injectFirst>
      <CssBaseline>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </CssBaseline>
    </StylesProvider>
  </Router>,
  document.getElementById('root')
);
