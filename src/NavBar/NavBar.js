import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  const register = () => {

  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Betting UI
      </Link>
      <div class="btn-group" role="group" aria-label="Authenticate user">
        <button className="btn btn-primary" onClick={() => {register()}}>Sign up</button>
        {
          !auth0Client.isAuthenticated() &&
          <button className="btn btn-primary" onClick={auth0Client.signIn}>Sign In</button>
        }
        {
          auth0Client.isAuthenticated() &&
          <div>
            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
            <button className="btn btn-primary" onClick={() => {signOut()}}>Sign Out</button>
          </div>
        }
      </div>
    </nav>
  );
}

export default withRouter(NavBar);