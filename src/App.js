import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Matches from './Matches/Matches';
import { Route, withRouter } from 'react-router-dom';
import Match from './Match/Match';
import Dashboard from './Dashboard/Dashboard,';
import Callback from './Callback';
import NewBet from './NewBet/NewBet';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import auth0Client from './Auth';
import LoginPage from './LoginPage/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession: false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession: false});
  }


  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={ Dashboard }/>
        <Route exact path='/sign-in' component={ LoginPage }/>
        <Route exact path='/match' component={ Matches }/>
        <Route exact path='/match/:matchId' component={ Match }/>
        <Route exact path='/callback' component={ Callback }/>
        <SecuredRoute path='/new-bet' component={ NewBet } checkingSession={this.state.checkingSession}/>
      </div>
    );
  }
}

export default withRouter(App);

// TODO:
// rejestracja użytkownika
// zalogowanie się przez usera (OAuth 0)
// stworzenie betu
// looknięcie na historię betów
// sprawdzenie betu
// doładowanie walletu
// widoki płatności

// Bet:
// ID
// UID
// CID
// CashDesk

// Bet
// Match ID
// Wariant
// Kurs

// Match
// Home
// Away
// [(wariant, kurs)]
// Time
// Wynik
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/
