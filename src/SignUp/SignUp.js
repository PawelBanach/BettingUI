import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if(!this.validate()) return;
    this.setState({
      disabled: true,
    });
    // TODO call create user service
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.setState({
      disabled: false,
    });
  }

  updateField(field, value) {
    let newState = { error: '' };
    newState[field] = value;
    this.setState(newState);
  }


  validate() {
    if(this.state.password.length < 8) {
      this.setState({
        error: 'Password required 8 or more signs.',
      });
      return false;
    } else if (this.state.password !== this.state.password_confirmation) {
      this.setState({
        error: 'Password confirmation does not match.',
      });
      return false;
    } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        error: 'Invalid email address.',
      });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="container login-container">
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
        <form className="form-sign-in" onSubmit={this.handleSubmit}>
          <input
            disabled={this.state.disabled}
            type="text"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Name"
            name="name"
          />
          <input
            disabled={this.state.disabled}
            type="text"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Surname"
            name="surname"
          />
          <input
            disabled={this.state.disabled}
            type="email"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Email"
            name="email"
          />
          <input
            disabled={this.state.disabled}
            type="text"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Username"
            name="username"
          />
          <input
            disabled={this.state.disabled}
            type="password"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Password"
            name="password"
          />
          <input
            disabled={this.state.disabled}
            type="password"
            onBlur={(e) => {this.updateField(e.target.name, e.target.value)}}
            className="form-control register-form-control"
            placeholder="Password Confirmation"
            name="password_confirmation"
          />
          <p className="form-error">{ this.state.error }</p>
          <button
            disabled={this.state.disabled}
            className="btn btn-dark btn-block btn-margin-top"
            type="submit">
            Sign Up
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp;
