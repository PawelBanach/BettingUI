import React, {Component} from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';

class BetSlip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  //  Make call for bet
  //  props.betId
  }

  render() {
    return (
      <MDBContainer fluid className="container-fluid-margin-left">
        <MDBRow>
          <div>SHOW BETSLIP</div>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default BetSlip;