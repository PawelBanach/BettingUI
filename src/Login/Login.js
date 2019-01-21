import React, {Component} from 'react';
import auth0Client from '../Auth';
import { Button } from 'mdbreact';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      username: '',
      password: '',
      error: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  async signIn(event) {
    event.preventDefault();
    if(!this.validate()) return;
    this.setState({
      disabled: true,
    });
    const { username, password } = this.state;
    auth0Client.login(username, password, (err, _authResult) => {
      this.setState({ disabled: false, error: err.description});
    });

  }

  updateUsername(value) {
    this.setState({
      username: value,
      error: '',
    });
  }

  updatePassword(value) {
    this.setState({
      password: value,
      error: '',
    });
  }

  validate() {
    if(this.state.password.length < 8) {
      this.setState({
        error: 'Password required 8 or more signs.',
      });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="container login-container">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <form className="form-sign-in" onSubmit={this.signIn}>
          <input
            disabled={this.state.disabled}
            type="text"
            onBlur={(e) => {this.updateUsername(e.target.value)}}
            className="form-control"
            placeholder="Username"
          />
          <input
            disabled={this.state.disabled}
            type="password"
            onBlur={(e) => {this.updatePassword(e.target.value)}}
            className="form-control"
            placeholder="Password"
          />
          <p className="form-error">{ this.state.error }</p>
          <Button
            disabled={this.state.disabled}
            className="btn btn-primary btn-block btn-margin-top"
            type="submit">
            Sign In
          </Button>
        </form>
      </div>
    )
  }
}

export default Login;
