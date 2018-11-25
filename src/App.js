import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Matches from './Matches/Matches';
import { Route } from 'react-router-dom';
import Match from './Match/Match';
import Dashboard from './Dashboard/Dashboard,';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={ Dashboard }/>
        <Route exact path='/match' component={ Matches }/>
        <Route exact path='/match/:matchId' component={ Match }/>
      </div>
    );
  }
}

export default App;

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

