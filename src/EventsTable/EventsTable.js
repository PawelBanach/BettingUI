import React, { Component } from 'react';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

class EventsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { leagues: props.leagues, matches: props.matches };
  }

  renderMatch(match) {
    return (
      <tr key={match.id}>
        <td>{match.time.toLocaleString()}</td>
        <td>{match.home}</td>
        <td>
          <div className="btn-group odd-group" role="group" aria-label="Odds">
            {match.odds.outcomes.map(odd => (
              <button
                key={odd.id}
                className="odd-result btn btn btn-sm cloudy-knoxville-gradient btn-rounded"
                onClick={() => this.props.addBet(match, odd.value, odd.id)}
              >
                <div className="odd-value">{ odd.value }</div>
              </button>
            ))}
          </div>
        </td>
        <td>{match.away}</td>
      </tr>
    )
  }

  renderLeague(league, matches = []) {
    return (
      <AccordionItem key={league}>
        <AccordionItemTitle>
          <h3 className="u-position-relative">
            {league}
            <div className="accordion__arrow" role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <table className="result-table">
            <tbody>
            { matches.map(match => this.renderMatch(match)) }
            </tbody>
          </table>
        </AccordionItemBody>
      </AccordionItem>
    );
  }

  render() {
    const { leagues, matches } = this.state;

    return (
      <Accordion accordion={false}>
        { leagues.map(league => this.renderLeague(league, matches[league])) }
      </Accordion>
    )
  }
}

export default EventsTable;