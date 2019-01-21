import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'mdbreact';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  register = () => {
    this.props.auth.register();
  };

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  renderUnauthenticatedNavBar() {
    return (
      <div>
        <Button className="btn btn-dark" onClick={() => {this.register()}}>Register</Button>
        <Button className="btn btn-dark" onClick={() => {this.login()}}>Sign In</Button>
      </div>
    )
  }

  renderAuthenticatedNavBar() {
    const { nickname, picture } = this.props.auth.getProfile();
    return (
      <div>
        <img src={picture} alt="Avatar" className="avatar"/>
        <label className="mr-2 text-white">{nickname}</label>
        <Button className="btn btn-dark" onClick={() => {this.logout()}}>Sign Out</Button>
      </div>
    )
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar navbar-dark fixed-top dark-theme">
        <Link className="navbar-brand betting-ui" to="/">
          JP Bets
        </Link>
        <div className="btn-group" role="group" aria-label="Authenticate user">
          { isAuthenticated() ? this.renderAuthenticatedNavBar() : this.renderUnauthenticatedNavBar() }
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);