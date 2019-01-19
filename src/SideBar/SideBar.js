import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <SideNav
        onSelect={(selected) => {
          this.state.browser.history.push(`/${selected}`);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="events">
          <NavItem eventKey="events">
            <NavIcon>
              <img src={require('../assets/event.png')} width="35px" height="35px"/>
            </NavIcon>
            <NavText>
              Events
            </NavText>
          </NavItem>
          <NavItem eventKey="wallet">
            <NavIcon>
              <img src={require('../assets/wallet.png')} width="35px" height="35px"/>
            </NavIcon>
            <NavText>
              Wallet
            </NavText>
          </NavItem>
          <NavItem eventKey="bet-slips">
            <NavIcon>
              <img src={require('../assets/betslip.png')} width="35px" height="35px"/>
            </NavIcon>
            <NavText>
              Bet Slips
            </NavText>
          </NavItem>
          <NavItem eventKey="statistics">
            <NavIcon>
              <img src={require('../assets/statistics.png')} width="35px" height="35px"/>
            </NavIcon>
            <NavText>
              Statistics
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    )
  }
}

export default SideBar;