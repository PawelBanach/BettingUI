import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      username: '',
      password: '',
    };
  }

  async componentDidMount() {
    // const { match: { params } } = this.props;
    // const match = (await axios.get(`http://localhost:8081/${params.matchId}`)).data;
    // this.setState({
    //   match,
    // });
  }

  async submit() {
    this.setState({
      disabled: true,
    });
    debugger;
    // todo: add authorize request
    // auth0Client.signIn
    // await axios.post('http://localhost:8081', {
    //   title: this.state.title,
    //   description: this.state.description,
    // }, {
    //   headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    // });

    this.props.history.push('/');
  }

  updateUsername(value) {
    // Add validation
    this.setState({
      username: value,
    });
  }

  updatePassword(value) {
    // Add validation
    this.setState({
      password: value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Sign In</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateUsername(e.target.value)}}
                    className="form-control"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password:</label>
                  <input
                    disabled={this.state.disabled}
                    type="password"
                    onBlur={(e) => {this.updatePassword(e.target.value)}}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage;
