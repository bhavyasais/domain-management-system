import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { history } from './helpers/history';
import Login from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import CommandCenter from './pages/CommandCenter/CommandCenter';
import store from './redux/store';
import EmailIntegration from './pages/EmailIntegration/EmailIntegration';
import Dashboard from './components/templates/Dashboard/Dashboard';

function App(props) {
  const { isAuthenticated } = useAuth0();

  useEffect(async () => {
    const params = {
      client_id: '691153043645-f97tr7f0n5m3h5ddpqj2ljl3igebfkp3.apps.googleusercontent.com',
      cookie_policy: 'single_host_origin',
      ux_mode: 'popup',
      access_type: 'online',
      scope: 'https://www.googleapis.com/auth/drive',
    };
    await window.gapi.load('auth2', async () => {
      const GoogleAuth = await window.gapi.auth2.getAuthInstance();
      if (!GoogleAuth) {
        window.gapi.auth2.init(params).then(
          (res) => {
            const signedIn = res.isSignedIn.get();
            if (signedIn) {
              console.log('already loged in', res.currentUser.get());
            }
          },
          (err) => {
            console.warn('error in init', err);
          },
        );
      } else {
        GoogleAuth.then(
          () => {
            if (GoogleAuth.isSignedIn.get()) {
              console.log('already init', GoogleAuth.currentUser.get());
            }
          },
          (err) => {
            console.warn('error ', err);
          },
        );
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/base" component={CommandCenter} />
          <Route exact path="/emailIntegration" component={EmailIntegration} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default hot(App);
