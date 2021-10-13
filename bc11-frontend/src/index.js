import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import './styles.scss';
import config from './auth_config.json';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
