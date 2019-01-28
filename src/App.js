import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Matches from './Matches/Matches';
import { Route, withRouter } from 'react-router-dom';
import Match from './Match/Match';
import Dashboard from './Dashboard/Dashboard';
import Callback from './Callback';
import NewBet from './NewBet/NewBet';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Auth from './Auth';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import SideBar from './SideBar/SideBar';
import Events from './Events/Events';
import Wallet from './Wallet/Wallet';
import Statistics from './Statistics/Statistics';
import BetSlips from './BetSlips/BetSlips';
import BetSlip from './BetSlip/BetSlip';
import { NotificationContainer } from 'react-notifications';


class App extends Component {

  constructor(props) {
    super(props);
    this.auth =  new Auth(props);
  }

  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.auth.handleAuthentication();
    }
  };

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true' && !this.auth.isAuthenticated()) {
      this.auth.renewSession(this.props.location.path);
    }
  }

  render() {
    return (
      <div>
        <NavBar auth={this.auth} />
        { this.auth.isAuthenticated() && <SideBar browser={this.props}/>}
        <NotificationContainer/>
        <Route exact path='/' component={ Dashboard }/>
        <Route exact path='/dashboard' component={ Dashboard }/>
        {/*<Route exact path='/events' component={ Events }/>*/}
        {/*<Route exact path='/wallet' component={ Wallet }/>*/}
        {/*<Route exact path='/betslips' component={ Betslips }/>*/}
        {/*<Route exact path='/statistics' component={ Statistics }/>*/}
        <Route exact path='/sign-in' component={ Login }/>
        <Route exact path='/sign-up' component={ SignUp }/>
        <Route exact path='/match' component={ Matches }/>
        <Route exact path='/match/:matchId' component={ Match }/>
        <Route path="/callback" render={(props) => {
          this.handleAuthentication(props);
          return <Callback {...props} />
        }}/>
        <SecuredRoute path='/new-bet' component={ NewBet } auth={this.auth}/>
        <SecuredRoute path='/events' component={ Events } auth={this.auth}/>
        <SecuredRoute path='/wallet' component={ Wallet } auth={this.auth}/>
        <SecuredRoute path='/bet-slips' component={ BetSlips } auth={this.auth}/>
        <SecuredRoute path='/bet-slips/:betId' component={ BetSlip } auth={this.auth}/>
        <SecuredRoute path='/statistics' component={ Statistics } auth={this.auth}/>
      </div>
    );
  }
}

export default withRouter(App);