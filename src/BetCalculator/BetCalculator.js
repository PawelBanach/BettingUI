import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import BetSlipsService from '../Services/BetSlips/BetSlipsService';
import { Button } from 'mdbreact';
import { NotificationManager } from 'react-notifications';


class BetCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if(newProps.bets.length !== oldProps.bets.length || newProps.betBase !== oldProps.betBase) {
      this.setState(newProps);
    }
  }

  renderBetsList(bets) {
    let betsRows = [];
    bets.forEach(bet => betsRows.push(
      <li className="list-group-item" key={bet.title}>
        <small>{bet.title}</small><br/>
        <small>Type: <b>{bet.variant}</b></small>
        <i
          className="fas fa-times float-right clickable"
          onClick={() => this.props.deleteBet(bet)}>
        </i>
        <br/>
        <small>Odd: <b>{bet.odd}</b></small>
      </li>
    ));

    return (
      <ul className="list-group">
        {betsRows}
      </ul>
    );
  }

  redirectToRegistrationPage = () => {
    this.props.history.push('/sign-up');
  };

  createBetSlip = () => {
    const { bets, betBase, userId } = this.state;
    const betSlip = {
      matches: bets,
      money: betBase,
      userId: userId,
      cashierId: userId,
      deskId: userId,
    };

    BetSlipsService.createBetSlip(
      betSlip,
      response => {
        NotificationManager.success('Bet-Slip created', 'Success!');
        this.props.resetBetSlip()
        // let id = response.data.id;
        // this.props.history.push(`/bet-slips/${id}`);
      },
      errors => {
        NotificationManager.error('Try again later', 'Error!');
        this.setState(prevState => ({
          errors: [...prevState.errors, errors]
        }))
      }
    )
  };

  onBet = (demo) => {
    (demo) ? this.redirectToRegistrationPage() : this.createBetSlip();
  };

  render() {
    const { betBase, bets, totalOdd, cashReward, demo } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          Bet slip
        </div>
        <div className="card-body">
          <div className="form-group">
            <div className="form-group">
              <div className="input-group mb-3">
                <input type="number" className="form-control" aria-label="Amount (to the nearest zloty)"
                       value={betBase} onChange={this.props.handleBaseChange}/>
                <div className="input-group-append">
                  <span className="input-group-text">.00 $</span>
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
              Estimated win <small>(with tax)</small>: {cashReward} $
            </b>
          </p>
          }

          <Button
            disabled={bets.length === 0}
            className="btn blue-gradient float-right"
            onClick={() => this.onBet(demo)}>
            Bet
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(BetCalculator);