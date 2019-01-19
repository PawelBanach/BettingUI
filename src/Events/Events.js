import React, {Component} from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import EventBoard from '../EventsBoard/EventBoard';

const Events = (profile) => (
  <MDBContainer fluid className="container-fluid-margin-left">
    <MDBRow>
      <EventBoard demo={false} profile={profile}/>
    </MDBRow>
  </MDBContainer>
);

export default Events;