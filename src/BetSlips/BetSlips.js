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
import { withRouter } from 'react-router-dom';
// https://github.com/CassetteRocks/react-infinite-scroller/blob/master/docs/src/index.js

const options = [
  { value: 'Pending', label: 'Pending' },
  { value: 'InProgress', label: 'In Progress' },
  { value: 'Finished', label: 'Finished' }
];

const LIMIT = 10;

class BetSlips extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      betSlips: [],
      betDetails: null,
      hasMoreItems: true,
      nextHref: null,
      errors: [],
      from: undefined,
      to: undefined,
      result: {},
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
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
    debugger;
    this.setState({ to }, this.showFromMonth);
  }

  handleChange = (result) => {
    this.setState({ result });
  };

  loadBetSlips = (page) => {
    const { from, to, result } = this.state;
    let options = {
      limit: LIMIT,
      offset: (page-1)*10,
      user: "test3",
      from: from ? from.toJSON() : null,
      to: to ? to.toJSON() : null,
      result: result.value
    };
    debugger;
    BetSlipsService.getBetSlips(options,
      response => {
        debugger;
        let betSlips = response.data.values;
        this.setState(prevState => ({
          betSlips: page === 1 ? betSlips : [...prevState.betSlips, ...betSlips],
          hasMoreItems: betSlips.length === LIMIT,
          betDetails: null,
        }))
      },
      errors => this.setState(prevState => ({
        errors: [...prevState.errors, errors]
      }))
    );
  };

  handleBetSlip = (betSlip) => {
    const betDetails = betSlip.betSlipId;
    this.setState(prevState => {
      return (prevState.betDetails === betDetails) ? { betDetails: null } : { betDetails }
    });
  };

  handleSearch = (event) => {
    this.loadBetSlips(1);
    event.preventDefault();
  };

  renderList(betSlips, betDetails) {
    // 2 TODO: Dorobić liczenie ile siadło meczów a ile nie siadło
    // 3 TODO: Dorobić ładny kręciolek
    // 4 TODO: Dorobic szukanie
    // 5 TODO: Obsłużyc wszedzie bledy
    // 6 TODO: Wymienić ikonki po lewej stronie
    // 7 TODO: Badge zmienić na jakiś ładny kolor

    let betSlipsList = [];
    betSlips.forEach( (betSlip) =>{
      betSlipsList.push(
        <li className="list-group-item bet-slip-row" key={betSlip.betSlipId} ref={`betSlip#${betSlip.betSlipId}`} onClick={() => this.handleBetSlip(betSlip)}>
          { betDetails !== betSlip.betSlipId &&
            <MDBRow>
              <MDBCol sm="2" className="float-left">
                <div>
                  <MDBBadge pill color="light">
                    <i className="far fa-calendar-check"/> 8/1/2019
                  </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="3" className="float-left">
                <div>
                <MDBBadge pill color="primary">
                  <i className="fas fa-tasks"/> {betSlip.result}
                </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="2" className="float-left">
                <div>
                <MDBBadge pill color="default">
                  <i className="fas fa-dollar-sign"/> {betSlip.money}
                </MDBBadge>
                </div>
              </MDBCol>
              <MDBCol sm="2" className="float-left">
                <div>
                  <MDBBadge pill color="default">
                    <i className="fas fa-dollar-sign"/> {betSlip.expectedWin}
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
          { betDetails === betSlip.betSlipId &&
            <MDBRow className="active-row">
              <MDBCol sm="4" className="float-left text-align-right">
                <div className="bet-row">
                  <MDBBadge pill color="light">
                    <i className="far fa-calendar-check"/> 8/1/2019
                  </MDBBadge>
                </div>
                <div className="bet-row">
                  <MDBBadge pill color="primary">
                    <i className="fas fa-tasks"/> {betSlip.result}
                  </MDBBadge>
                </div>
                <div className="bet-row">
                  <MDBBadge pill color="default">
                    <i className="fas fa-dollar-sign"/> {betSlip.money}
                  </MDBBadge>
                </div>
                <div className="bet-row">
                  <MDBBadge pill color="default">
                    <i className="fas fa-dollar-sign"/> {betSlip.expectedWin}
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
    const { from, to, result, betSlips, betDetails, hasMoreItems } = this.state;
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
                value={result}
                onChange={this.handleChange}
                options={options}
                isClearable={true}
              />

              <Button
                className="blue-gradient btn-lg btn-rounded btn-sm my-0"
                type="submit"
                onClick={ this.handleSearch }>
                Search
              </Button>
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
                  <MDBCol sm="2" className="float-left">
                    <div><span>Date</span></div>
                  </MDBCol>
                  <MDBCol sm="3" className="float-left">
                    <div><span>Status</span></div>
                  </MDBCol>
                  <MDBCol sm="2" className="float-left">
                    <div><span>Money</span></div>
                  </MDBCol>
                  <MDBCol sm="2" className="float-left">
                    <div><span>Expected win</span></div>
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

export default withRouter(BetSlips);