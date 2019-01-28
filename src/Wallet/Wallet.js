import React, {Component} from 'react';
import {
  MDBContainer, MDBRow, MDBCol, Container, Modal, ModalBody, ModalHeader,
  ModalFooter, Button, MDBBadge, Card, CardBody, CardTitle, CardText, CardImage
} from 'mdbreact';
import PaymentsService from '../Services/Payments/PaymentsService';
import moment from 'moment';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      walletTransactions: [],
      modal: "close",
      amount: 0,
      accessToken: props.accessToken,
      userId: "test3",
    };
    debugger;
  }

  componentDidMount() {
    this.refreshWalletInfo();
  }

  refreshWalletInfo() {
    PaymentsService.getWalletInfo(this.state.userId, this.returnHeaders(),
      response => {
        debugger;
        const { balance, walletTransactions} = response.data[0].wallet;
        debugger;
        this.setState({ balance, walletTransactions });
      },
      error => {
        debugger;
        // TODO
      })
  }

  returnHeaders = () => {
    return {
      'Authorization': `Bearer ${this.state.accessToken}`,
      'Content-Type': 'application/json'
    };
  };

  setModal = (modal) => {
    this.setState({ modal });
  };

  handleAmountChange = (event) => {
    const amount = parseInt(event.target.value) ? parseInt(event.target.value) : '';
    this.setState({ amount });
  };

  createTransaction = (type) => {
    let body = {
      type: type,
      amount: this.state.amount
    };

    PaymentsService.createTransaction(this.state.userId, body, this.returnHeaders(),
      response => {
        debugger;
        this.refreshWalletInfo();
        this.setState({modal: "close"})
      },
      error => {
        // TODO
        debugger;
        this.setState({modal: "close"})
      })
  };

  renderTransactions(transactions) {
    let transactionsList = [];
    transactions.forEach( (transaction, i) => {
      transactionsList.push(
        <li className="list-group-item" key={i}>
          <MDBRow>
            <MDBCol sm="3" className="float-left">
              <div>
                <MDBBadge pill color="light">
                  <i className="far fa-clock"/> {moment(transaction.createdDate).format('MMMM Do YYYY, h:mm:ss a')}
                </MDBBadge>
              </div>
            </MDBCol>
            <MDBCol sm="3" className="float-left">
              <div>
                  { transaction.type === 'topup' &&
                    <MDBBadge pill color="success"><i className="fas fa-chevron-up"/> {transaction.type}</MDBBadge>
                  }
                  { transaction.type === 'withdraw' &&
                    <MDBBadge pill color="danger"><i className="fas fa-chevron-down"/> {transaction.type}</MDBBadge>
                  }
              </div>
            </MDBCol>
            <MDBCol sm="3" className="float-left">
              <div>
                  <MDBBadge pill color="default">
                    <i className="fas fa-dollar-sign"/> {transaction.amount.$numberDecimal} $
                  </MDBBadge>
              </div>
            </MDBCol>
            <MDBCol sm="3" className="float-left">
              <div>
                { transaction.betId &&
                  <MDBBadge pill color="info">
                    <i className="fas fa-futbol"/> Bet {transaction.betId}
                  </MDBBadge>
                }
                { !transaction.betId &&
                  <MDBBadge pill color="info">
                    <i className="fas fa-handshake"/> 4007 3639 8038 2946
                  </MDBBadge>
                }
              </div>
            </MDBCol>
          </MDBRow>
        </li>
      )
    });
    return transactionsList;
  }

  render() {
    const { balance, walletTransactions, modal, amount } = this.state;
    return (
      <MDBContainer fluid className="container-fluid-margin-left">
        <MDBRow>
          <Container className="margin-top-30">
            <MDBCol sm="4" className="float-left">
              <img
                className="img-fluid z-depth-1-half"
                src={require('../assets/wallet/wallet.jpg') }
              />
            </MDBCol>
            <MDBCol sm="8" className="float-left">
              <div className="margin-top-40">
                <h3 className="wallet-header">Wallet</h3>
                <div className="wallet-money-info">
                  <span className="wallet-info">Current balance status
                    <MDBBadge pill color="primary" className="wallet-money"> {balance}$</MDBBadge>
                </span>
                </div>
                <div className="wallet-buttons">
                  <Button gradient="blue" type="submit" onClick={() => this.setModal("topup")}>
                    TopUp
                  </Button>
                  <Button gradient="blue" type="submit" onClick={() => this.setModal("withdraw")}>
                    Withdraw
                  </Button>
                </div>
              </div>
            </MDBCol>
          </Container>
        </MDBRow>
        <MDBRow>
          <Container>
            <ul className="list-group list-group-flush text-align-center">
              <li className="list-group-item" key={0}>
                <MDBCol sm="3" className="float-left">
                  <div><span>Time</span></div>
                </MDBCol>
                <MDBCol sm="3" className="float-left">
                  <div><span>Type</span></div>
                </MDBCol>
                <MDBCol sm="3" className="float-left">
                  <div><span>Money</span></div>
                </MDBCol>
                <MDBCol sm="3" className="float-left">
                  <div><span>From/To</span></div>
                </MDBCol>
              </li>
              { this.renderTransactions(walletTransactions) }
            </ul>
          </Container>
        </MDBRow>
        <Modal isOpen={modal === "topup"} toggle={() => this.setModal("close")}>
          {/* TODO: gradient header*/}
          <ModalHeader toggle={() => this.setModal("close")}>Top Up Money</ModalHeader>
          <ModalBody>
            <form>
              <label htmlFor="amount" className="grey-text">Amount</label>
              <div className="input-group mb-3">
                <input type="number" id="amount" className="form-control" aria-label="Amount (to the nearest zloty)"
                       value={amount} onChange={this.handleAmountChange}/>
                <div className="input-group-append">
                  <span className="input-group-text">.00 $</span>
                </div>
              </div>
              <label htmlFor="cardNumber" className="grey-text">Card number</label>
              <input type="tel" id="cardNumber" className="form-control" pattern="\d*" maxLength="19"/>
              <br />
              <label htmlFor="expiresAt" className="grey-text">MM / YY</label>
              <input type="tel" id="expiresAt" className="form-control" pattern="\d*" maxLength="7"
              />
              <br />
              <label htmlFor="cvc" className="grey-text">CVC</label>
              <input type="tel" id="defaultFormRegisterConfirmEx" className="form-control" pattern="\d*" maxLength="4"/>
              <br />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.setModal("close")}>Close</Button>{' '}
            <Button color="primary" disabled={ amount < 1 } onClick={() => this.createTransaction("topup")}>Save changes</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal === "withdraw"} toggle={() => this.setModal("close")}>
          <ModalHeader toggle={() => this.setModal("close")}>Withdraw Money</ModalHeader>
          <ModalBody>
            <form>
              <label htmlFor="amount" className="grey-text">Amount</label>
              <div className="input-group mb-3">
                <input type="number" id="amount" className="form-control" aria-label="Amount (to the nearest zloty)"
                       value={amount} onChange={this.handleAmountChange}/>
                <div className="input-group-append">
                  <span className="input-group-text">.00 $</span>
                </div>
              </div>
              <label htmlFor="cardNumber" className="grey-text">Card number</label>
              <input type="tel" id="cardNumber" className="form-control" pattern="\d*" maxLength="19"/>
              <br />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.setModal("close")}>Close</Button>{' '}
            <Button color="primary" disabled={ amount < 1 } onClick={() => this.createTransaction("withdraw")}>Save changes</Button>
          </ModalFooter>
        </Modal>
      </MDBContainer>
    )
  }
}

export default Wallet;