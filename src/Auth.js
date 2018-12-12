import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'rozrywki2018.auth0.com',
    clientID: 'SnusKbV9Muma176hmEbWOMx2lOnsM3sl',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  //     "username": "m2984732@nwytg.net",
  //     "password": "Test1234",

  constructor(props) {
    this.state = {
      ...props,
      accessToken: '',
      idToken: '',
      profile: {},
      expiresAt: 0,
    };
    this.renewSession();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken && authResult.profile) {
        this.setSession(authResult);
      } else if (err) {
        this.state.history.push('/dashboard');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => {
    return this.state.accessToken;
  };

  getIdToken = () => {
    return this.state.idToken;
  };

  getProfile = () => {
    return this.state.profile;
  };


  setSession = (authResult) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.state.accessToken = authResult.accessToken;
    this.state.idToken = authResult.idToken;
    this.state.profile = authResult.idTokenPayload;
    this.state.expiresAt = expiresAt;
    // navigate to the home route
    this.state.history.push('/dashboard');
  };

  renewSession = (callback) => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        // console.log(err);
        // alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  };

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    // Remove tokens and expiry time
    this.state.accessToken = null;
    this.state.idToken = null;
    this.state.profile = {};
    this.state.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // navigate to the home route
    this.state.history.push('/dashboard');
  };

  register = () => {
    // todo: change to register on Auth0
    this.state.history.push('/sign-up');
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.state.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
