import React, {Component} from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import EventBoard from '../EventsBoard/EventBoard';

class Events extends Component {
  render() {
    return (
      <MDBContainer fluid className="container-fluid-margin-left">
        <MDBRow>
          <EventBoard demo={false}/>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Events;