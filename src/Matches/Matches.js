import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Matches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: null,
    };
  }

  async componentDidMount() {
    // const matches = (await axios.get('http://localhost:8081/')).data;
    // this.setState(matches);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.matches === null && <p>Loading matches...</p>}
          {
            this.state.matches && this.state.matches.map(match => (
              <div key={match.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${match.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {match.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{match.title}</h4>
                      <p className="card-text">{match.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Matches;