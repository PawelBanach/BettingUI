import React, {Component} from 'react';
import { MDBCol, Container } from 'mdbreact';
import MatchesService from '../Services/Matches/MatchesService';


// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import BetCalculator from '../BetCalculator/BetCalculator';
import EventsTable from '../EventsTable/EventsTable';

class EventBoard extends Component {
  MOST_POPULAR_LEAGUES = ['Premier League', 'ESP La Liga Primera', 'FRA Division 1', 'GER Bundesliga',  'Serie A'];
  EKSTRAKLASA = ['POL Ekstraklasa'];

  constructor(props) {
    super(props);
    this.state = {
      betBase: 1,
      cashReward: 1,
      totalOdd: 1,
      bets: [], // todo: save bets in localstorage
      matches: [],
      matchesGroupedByLeague: {},
      errors: [],
      demo: props.demo,
    };
  }

  componentDidMount() {
    let options = {
      pagination: {
        page: 0,
        pageSize: 10,
      },
    };
    MatchesService.getMatches(options,
      response => {
        let formattedMatches = this.formatMatches(response.data);
        let matchesGroupedByLeague = this.groupByLeague(formattedMatches);
        this.setState({ matches: formattedMatches, matchesGroupedByLeague: matchesGroupedByLeague })
      }, errors => {
        this.setState(prevState => ({
          errors: prevState.errors + errors
        }))
      })
  }

  formatMatches(matches) {
    return matches.map(m => (
      {
        id: m.id,
        home: m.home.name,
        away: m.away.name,
        time: new Date(m.time),
        league: m.league.name,
        odds: m.odds.find(o => o.name === "Full Time Result")
      }
    ));
  }

  groupByDate(matches) {
    return matches.reduce((acc, obj) => {
      let key = obj.time.toLocaleDateString();
      if (!acc[key]) { acc[key] = []; }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  groupByLeague(matches) {
    return matches.reduce((acc, obj) => {
      let key = obj.league;
      if (!acc[key]) { acc[key] = []; }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  twoDecimals = num => Math.round(num * 100) / 100;

  addBet = (event, odd, type) => {
    const bet = { title: `${event.home} - ${event.away}`, type: type, odd: odd, };
    this.setState((prevState) => {
        const bets = [bet, ...prevState.bets];
        const totalOdd = this.twoDecimals(bets.map((bet) => bet.odd).reduce((a, b) => a * b, 1));
        const betBase = prevState.betBase || 1;
        const cashReward = this.twoDecimals( betBase * totalOdd * 0.88);
        return { bets, totalOdd, cashReward, betBase };
      }
    )
  };

  deleteBet = (bet) => {
    this.setState((prevState) => {
      const bets = prevState.bets.filter(b => b !== bet);
      const totalOdd = this.twoDecimals(bets.map((bet) => bet.odd).reduce((a, b) => a * b, 1));
      const betBase = prevState.betBase || 1;
      const cashReward = this.twoDecimals( betBase * totalOdd * 0.88);
      return { bets, totalOdd, cashReward, betBase };
      }
    )
  };

  handleBaseChange = (event) => {
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

  render() {
    const { matchesGroupedByLeague, demo, bets, betBase, cashReward, totalOdd } = this.state;

    return (
      <Container>
        <h3 className="bets-header">Bet the latest matches from 5 TOP LEAGUES and Ekstraklasa</h3>
        <MDBCol sm="9" className="float-left">
          { Object.keys(matchesGroupedByLeague).length !== 0 &&
            <EventsTable
              leagues={ [...this.MOST_POPULAR_LEAGUES, ...this.EKSTRAKLASA] }
              matches={ matchesGroupedByLeague }
              addBet={ this.addBet }
            />
          }
        </MDBCol>
        <MDBCol sm="3" className="float-left">
          <BetCalculator
            demo={ demo }
            bets={ bets }
            betBase={ betBase }
            cashReward={ cashReward }
            deleteBet={ this.deleteBet }
            totalOdd={ totalOdd }
            handleBaseChange={ this.handleBaseChange }
          />
        </MDBCol>
      </Container>
    )
  }
}

export default EventBoard;