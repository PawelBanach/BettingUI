import React, {Component} from 'react';

class Dashboard extends Component {
  MOST_POPULAR_GAMES = [
    {
      match: 1,
      home: 'Valencia',
      away: 'Manchester United',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' - ',
    },
    {
      match: 2,
      home: 'Szachtar Donieck',
      away: 'Olympique Lyon',
      variant: {
        home: 2.35,
        draw: 3.65,
        away: 3.22,
      },
      time: '',
      result: ' - ',
    },
    {
      match: 3,
      home: 'Ajax Amsterdam',
      away: 'Bayern Monachium',
      variant: {
        home: 3.64,
        draw: 3.60,
        away: 2.00,
      },
      time: '',
      result: ' - ',
    },
    {
      match: 4,
      home: 'Real Madryt',
      away: 'CSKA Moskwa',
      variant: {
        home: 1.22,
        draw: 6.75,
        away: 11.79,
      },
      time: '',
      result: ' - ',
    },
    {
      match: 5,
      home: 'BSC Young Boys Berno',
      away: 'Juventus Turyn',
      variant: {
        home: 8.11,
        draw: 4.65,
        away: 1.40,
      },
      time: '',
      result: ' - ',
    },
    {
      match: 6,
      home: 'Manchester City',
      away: 'Hoffenheim',
      variant: {
        home: 1.22,
        draw: 6.75,
        away: 11.79,
      },
      time: '',
      result: ' - ',
    },
  ];

  DURING_GAME = [
    {
      match: 7,
      home: 'AS Monaco',
      away: 'Borussia Dortmund',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 0 - 2 ',
    },
    {
      match: 8,
      home: 'Liverpool FC',
      away: 'Napoli',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 1 - 0 ',
    },
    {
      match: 9,
      home: 'Inter Mediolan',
      away: 'PSV Eindhoven',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 1 - 1 ',
    },
    {
      match: 10,
      home: 'Crvena Zvezda',
      away: 'PSG',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 1 - 4 ',
    },
    {
      match: 11,
      home: 'Club Brugge KV',
      away: 'Atlético Madryt',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 0 - 0 ',
    },
    {
      match: 12,
      home: 'FC Barcelona',
      away: 'Tottenham Hotspur',
      variant: {
        home: 2.65,
        draw: 3.45,
        away: 2.92,
      },
      time: '',
      result: ' 1 - 1 ',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      betBase: 1,
      cashReward: 1,
      totalOdd: 1,
      bets: [], // todo: save bets in localstorage
    };

    this.handleBaseChange = this.handleBaseChange.bind(this);
  }

  twoDecimals = num => Math.round(num * 100) / 100;

  handleBaseChange(event) {
    let betBase = event.target.value;
    if(betBase !== '') {
      betBase = Math.round(betBase);
      if(betBase === 0) betBase = 1;
      if(betBase < 1) betBase *= -1;
    }
    this.setState((prevState) => {
        const cashReward = this.twoDecimals((betBase || 1) * prevState.totalOdd * 0.88);
        return { betBase, cashReward };
      }
    )
  };

  addBet = (event, odd, type) => {
    const bet = {
      title: `${event.home} - ${event.away}`,
      type: type,
      odd: odd,
    };

    this.setState((prevState) => {
      const bets = [bet, ...prevState.bets];
      const totalOdd = this.twoDecimals(bets.map((bet) => bet.odd).reduce((a, b) => a * b, 1));
      const betBase = prevState.betBase || 1;
      const cashReward = this.twoDecimals( betBase * totalOdd * 0.88);
      return { bets, totalOdd, cashReward, betBase };
      }
    )
  };

  renderEvent(event) {
    return (
      <div className="single-event" key={event.match}>
        <div>
          <button type="button" className="btn btn-secondary event-header">
            {event.home} <b>{event.result}</b> {event.away}
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-secondary event-footer" onClick={() => this.addBet(event, event.variant.home, '1')}>
            {event.variant.home}
          </button>
          <button type="button" className="btn btn-secondary event-footer" onClick={() => this.addBet(event, event.variant.draw, 'X')}>
            {event.variant.draw}
          </button>
          <button type="button" className="btn btn-secondary event-footer" onClick={() => this.addBet(event, event.variant.away, '2')}>
            {event.variant.away}
          </button>
        </div>
      </div>
    )
  }

  renderColumn(events) {
    let eventsRows = [];
    events.forEach(event => eventsRows.push(this.renderEvent(event)));

    return (
      <div className="col-6 float-left padding-right">
        {eventsRows}
      </div>
    )
  }

  renderBetsList(bets) {
    let betsRows = [];
    bets.forEach(bet => betsRows.push(
      <li className="list-group-item" key={bet.title}>
        <small>{bet.title}</small><br/>
        <small>Type: <b>{bet.type}</b></small><br/>
        <small>Odd: <b>{bet.odd}</b></small>
      </li>
    ));

    return (
      <ul className="list-group">
        {betsRows}
      </ul>
    );
  }

  render() {
    const { bets, totalOdd, cashReward, betBase } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <div className="card">
              <div className="card-body no-padding max-height">
                <div className="col-3 float-left no-padding">
                  <img src={require('../assets/dashboard/popular-events.png')} height="350px"/>
                </div>
                <div className="col-9 float-left padding-15">
                  <h5 className="card-title">The most popular games</h5>
                  { this.renderColumn(this.MOST_POPULAR_GAMES.slice(0, 3)) }
                  { this.renderColumn(this.MOST_POPULAR_GAMES.slice(3, 6)) }
                  <p className="card-text text-right">
                    <small className="text-muted">Last updated 5 mins ago, to </small>
                    <a href="#"><small>see more games click here.</small></a>
                  </p>
                </div>
              </div>
            </div>

            <div className="card margin-top-40">
              <div className="card-body no-padding max-height">
                <div className="col-9 float-left padding-15">
                  <h5 className="card-title">Matches currently during the game</h5>
                  { this.renderColumn(this.DURING_GAME.slice(0, 3)) }
                  { this.renderColumn(this.DURING_GAME.slice(3, 6)) }
                  <p className="card-text text-right">
                    <small className="text-muted">Last updated 11 mins ago, to </small>
                    <a href="#"><small>see more games click here.</small></a>
                  </p>
                </div>
                <div className="col-3 float-right no-padding">
                  <img src={require('../assets/dashboard/during-game.png')} height="350px" className="float-right"/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                Bet slip
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <input type="number" className="form-control" aria-label="Amount (to the nearest zloty)"
                              value={betBase} onChange={this.handleBaseChange}/>
                      <div className="input-group-append">
                        <span className="input-group-text">.00 zł</span>
                      </div>
                    </div>
                    { bets.length === 0 &&
                      <ul className="list-group">
                        <li className="list-group-item">
                          Bet slip empty.<br/>
                          Add first bet from events list.
                        </li>
                      </ul>
                    }
                    { bets.length !== 0 && this.renderBetsList(bets) }

                  </div>
                </div>
                { bets.length !== 0 &&
                  <p className="card-text">
                    <b>
                      Total odd: {totalOdd}<br/>
                      Estimated win <small>(with tax)</small>: {cashReward} zł
                    </b>
                  </p>
                }

                <button disabled className="btn btn-primary float-right">Bet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;