import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, Container, Button, MDBBadge } from 'mdbreact';
import BetSlipsService from '../Services/BetSlips/BetSlipsService';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
// http://react-day-picker.js.org/examples/input-from-to
import { formatDate, parseDate } from 'react-day-picker/moment';
// import dayPickerStyles from './DayPickerInput.css';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroller'
// https://github.com/CassetteRocks/react-infinite-scroller/blob/master/docs/src/index.js

const options = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'finished', label: 'Finished' }
];

const betSlipsMock = [
  {
    betSlipId : "04dfc6ab-dc88-41cf-8665-0de3fbfe6f63",
    bets : [
      {
        matchId : "1145814777173199265",
        course : 265,
        variant : "Home Win",
        home: "FC Barcelona",
        away: "Real Madryt",
        date: "7 May 19 20:40",
      },
    ],
    cashierId : "1",
    userId : "1",
    deskId : "1",
    money : 0
  },
  {
    betSlipId : "04dfc6ab-dc88-41cf-8665-0de3fbfe6f64",
    bets : [
      {
        matchId : "1145814777173199265",
        course : 265,
        variant : "Home Win",
        home: "FC Barcelona",
        away: "Real Madryt",
        date: "7 May 19 20:40",
      },
      {
        matchId : "1145814777173199265",
        course : 165,
        variant : "Draw",
        home: "Liverpool",
        away: "Arsenal Londyn",
        date: "9 May 19 20:40",
      },
      {
        matchId : "1145814777173199265",
        course : 312,
        variant : "Home Win",
        home: "PSG",
        away: "AS Monaco",
        date: "8 May 19 20:40",
      },
      {
        matchId : "1145814777173199265",
        course : 119,
        variant : "Away Win",
        home: "Legia Warszawa",
        away: "Wisła Kraków",
        date: "11 May 19 20:40",
      },
    ],
    cashierId : "1",
    userId : "1",
    deskId : "1",
    money : 0
  },
  {
    betSlipId : "04dfc6ab-dc88-41cf-8665-0de3fbfe6f65",
    bets : [ {
      matchId : "1145814777173199265",
      course : 265,
      variant : "Home Win",
      home: "FC Barcelona",
      away: "Real Madryt",
      date: "7 May 19 20:40",
    } ],
    cashierId : "1",
    userId : "1",
    deskId : "1",
    money : 0
  },
  {
    betSlipId : "04dfc6ab-dc88-41cf-8665-0de3fbfe6f66",
    bets : [ {
      matchId : "1145814777173199265",
      course : 265,
      variant : "Home Win",
      home: "FC Barcelona",
      away: "Real Madryt",
      date: "7 May 19 20:40",
    } ],
    cashierId : "1",
    userId : "1",
    deskId : "1",
    money : 0
  },
];

class BetSlips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betSlips: [],
      betDetails: null,
      hasMoreItems: true,
      nextHref: null,
      errors: [],
      from: undefined,
      to: undefined,
      selectedOption: null,
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentDidMount() {
    // TODO:
    // https://59ff134a.ngrok.io/bet-slips?limit=10&offset=0&user=1
    let options = {
      limit: 10,
      offset: 0,
      user: 1,
    };
    BetSlipsService.getBetSlips(options,
      response => {
      // let betSlips = response.data.value;
      // this.setState({ betSlips });
      this.setState({ betSlips: betSlipsMock });
      },
      errors => this.setState(prevState => ({
        errors: [...prevState.errors, errors]
      }))
    )
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  loadBetSlips = (page) => {
    const self = this;

    this.setState(prevState => ({
        betSlips: [...prevState.betSlips, ...betSlipsMock]
    }))
  };

  handleBetSlip = (betSlip, i) => {
    const betDetails = i;
    this.setState(prevState => {
      return (prevState.betDetails === betDetails) ? { betDetails: null } : { betDetails }
    });
  };

  renderList(betSlips, betDetails) {
    let betSlipsList = [];
    betSlips.forEach( (betSlip, i) =>{
      betSlipsList.push(
        <li className="list-group-item bet-slip-row" key={i} ref={`betSlip#${i}`} onClick={() => this.handleBetSlip(betSlip, i)}>
          { betDetails !== i &&
            <MDBRow>
              <MDBCol sm="3" className="float-left">
                <div>
                  <MDBBadge pill color="light">
                    <i className="far fa-calendar-check"/> 8/1/2019
                  </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="3" className="float-left">
                <div>
                <MDBBadge pill color="primary">
                  <i className="fas fa-tasks"/> IN PROGRESS
                </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="3" className="float-left">
                <div>
                <MDBBadge pill color="default">
                  <i className="fas fa-dollar-sign"/> 10.00 $
                </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="3" className="float-left">
                <div>
                  <MDBBadge pill className="match-badge" color="success">1</MDBBadge>
                  <MDBBadge pill className="match-badge" color="danger">1</MDBBadge>
                  <MDBBadge pill className="match-badge" color="primary">2</MDBBadge>
                </div>
              </MDBCol>
            </MDBRow>
          }
          { betDetails === i &&
            <MDBRow className="active-row">
              <MDBCol sm="4" className="float-left text-align-right">
                <div className="bet-row">
                  <MDBBadge pill color="light">
                    <i className="far fa-calendar-check"/> 8/1/2019
                  </MDBBadge>
                </div>
                <div className="bet-row">
                  <MDBBadge pill color="primary">
                    <i className="fas fa-tasks"/> IN PROGRESS
                  </MDBBadge>
                </div>
                <div className="bet-row">
                  <MDBBadge pill color="default">
                    <i className="fas fa-dollar-sign"/> 10.00 $
                  </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="8" className="float-left">
                { betSlip.bets.map( (b, i) => (
                    <div className="bet-row" key={i}>
                      <MDBCol sm="6" className="float-left text-align-center">
                        { b.variant === 'Home Win' && <span className="event-title"><b>{b.home}</b>{` - ${b.away}`}</span> }
                        { b.variant === 'Away Win' && <span className="event-title">{`${b.home} - `}<b>{b.away}</b></span> }
                        { b.variant === 'Draw' && <span className="event-title"><b>{`${b.home} - ${b.away}`}</b></span> }
                      </MDBCol>
                      <MDBCol sm="6" className="float-left text-align-left">
                        <MDBBadge pill className="event-badge" color="light">
                          <i className="fas fa-futbol"/> {b.date}
                        </MDBBadge>
                        <MDBBadge pill className="event-badge" color="info">
                         <i className="fas fa-chart-line"/> {b.course/100}
                       </MDBBadge>
                      </MDBCol>
                    </div>
                ))}
              </MDBCol>
            </MDBRow>
          }
        </li>
      )
    });
    return betSlipsList;
  }

  render() {
    const { from, to, selectedOption, betSlips, betDetails, hasMoreItems } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <MDBContainer fluid className="container-fluid-margin-left">
        <MDBRow>
          <Container>
            <form className="form-inline md-form mr-auto mb-4 bet-slips-form">
              <div className="InputFromTo">
                <DayPickerInput
                  value={from}
                  placeholder="From"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { after: to },
                    toMonth: to,
                    modifiers,
                    numberOfMonths: 1,
                    onDayClick: () => this.to.getInput().focus(),
                  }}
                  inputProps={
                    {
                      style: {
                        width: 200,
                        padding: 6,
                        fontFamily: "Roboto",
                        fontWeight: 300,
                        borderColor: "#CCC",
                        borderRadius: 4,
                        borderStyle: "solid",
                        borderWidth: 1,
                        marginRight: 20,
                      }
                    }
                  }
                  onDayChange={this.handleFromChange}
                />{' '}
                —{' '}
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="To"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 1,
                  }}
                  inputProps={
                    {
                      style: {
                        width: 200,
                        padding: 6,
                        fontFamily: "Roboto",
                        fontWeight: 300,
                        borderColor: "#CCC",
                        borderRadius: 4,
                        borderStyle: "solid",
                        borderWidth: 1,
                        marginLeft: 20,

                      }
                    }
                  }
                  onDayChange={this.handleToChange}
                />
              </div>

              <Select
                className="status-select"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                isClearable={true}
              />

              <Button className="btn blue-gradient btn-lg btn-rounded btn-sm my-0" type="submit">Search</Button>
            </form>
          </Container>
          <p>test</p>
        </MDBRow>
        <MDBRow>
          <Container className="container-margin">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadBetSlips}
              hasMore={hasMoreItems}
              loader={<div className="loader" key={0}>Loading ...</div>}>
              <ul className="list-group list-group-flush text-align-center">
                <li className="list-group-item" key={0}>
                  <MDBCol sm="3" className="float-left">
                    <div><span>Date</span></div>
                  </MDBCol>
                  <MDBCol sm="3" className="float-left">
                    <div><span>Status</span></div>
                  </MDBCol>
                  <MDBCol sm="3" className="float-left">
                    <div><span>Money</span></div>
                  </MDBCol>
                  <MDBCol sm="3" className="float-left">
                    <div><span>Bets results</span></div>
                  </MDBCol>
                </li>
                { this.renderList(betSlips, betDetails) }
              </ul>
            </InfiniteScroll>
          </Container>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default BetSlips;