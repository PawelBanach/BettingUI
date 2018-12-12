import React, {Component} from 'react';

class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron wallet-container">
            <h1 className="display-6 wallet-header">Current balance: 100$</h1>
            <hr className="my-4"/>
            <button type="button" className="btn btn-outline-success btn-lg wallet-btn">
              <img src={require('../assets/coins.png')} className="wallet-icons"/>
              Buy credit
            </button>
            <button type="button" className="btn btn-outline-danger btn-lg wallet-btn">
              <img src={require('../assets/money.png')} className="wallet-icons"/>
              Withdraw cash
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Wallet;