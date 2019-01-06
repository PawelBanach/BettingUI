import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class BetCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props }
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

  redirectToRegistrationPage = () => {
    this.props.history.push('/sign-up');
  };

  // TODO: Delete
  redirectToWallets = () => {
    this.props.history.push('/wallets');
  };

  onBet = (demo) => {
    debugger;
    (demo) ? this.redirectToRegistrationPage() : this.redirectToWallets();
      // return this.redirectToCrateBetSlipPage();
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

          <button
            // disabled={bets.length === 0}
            className="btn btn-primary float-right"
            onClick={() => this.onBet(demo)}>
            Bet
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(BetCalculator);