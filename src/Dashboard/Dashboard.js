import React from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';

import MainCarousel from './MainCarousel/MainCarousel';
import EventBoard from '../EventsBoard/EventBoard';

const Dashboard = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MainCarousel/>
    </MDBRow>
    <MDBRow>
      <EventBoard demo={true}/>
    </MDBRow>
  </MDBContainer>
);

export default Dashboard;