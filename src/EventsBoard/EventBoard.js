import React, {Component} from 'react';
import { MDBCol, Container } from 'mdbreact';
import MatchesService from '../Services/Matches/MatchesService';


// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import BetCalculator from '../BetCalculator/BetCalculator';
import EventsTable from '../EventsTable/EventsTable';
import { NotificationManager } from 'react-notifications';

class EventBoard extends Component {
  constructor(props) {
    super(props);
    let name = '';
      if(props.profile && props.profile.profile && props.profile.profile.name) {
      name = props.profile.profile.name
    }
    this.state = {
      betBase: 1,
      cashReward: 1,
      totalOdd: 1,
      bets: [], // todo: save bets in localstorage
      matches: [],
      matchesGroupedByLeague: {},
      errors: [],
      demo: props.demo,
      userId: "test4", // temporary i pass `name`
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
        NotificationManager.error('Cannot get matches!', 'Error!');
        this.setState(prevState => ({
          errors: [...prevState.errors, errors]
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

  addBet = (event, odd, variant) => {
    const bet = { title: `${event.home} - ${event.away}`, variant: variant, odd: odd, matchId: event.id };
    this.setState((prevState) => {
        if (prevState.bets.find(b => b.matchId === bet.matchId)) return {};
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

  resetBetSlip = () => {
    this.setState({ betBase: 1, cashReward: 1, totalOdd: 1, bets: []});
  };

  render() {
    const { matchesGroupedByLeague, demo, bets, betBase, cashReward, totalOdd, userId } = this.state;

    return (
      <Container className="container-margin">
        <h3 className="bets-header">Bet the latest matches from all leagues!</h3>
        <MDBCol sm="9" className="float-left">
          { Object.keys(matchesGroupedByLeague).length !== 0 &&
            <EventsTable
              leagues={ Object.keys(matchesGroupedByLeague) }
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
            resetBetSlip={ this.resetBetSlip }
            userId={ userId }
          />
        </MDBCol>
      </Container>
    )
  }
}

export default EventBoard;