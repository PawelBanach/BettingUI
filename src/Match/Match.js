import React, {Component} from 'react';
import axios from 'axios';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: null,
    };
  }

  async componentDidMount() {
    // const { match: { params } } = this.props;
    // const match = (await axios.get(`http://localhost:8081/${params.matchId}`)).data;
    // this.setState({
    //   match,
    // });
  }

  render() {
    const {match} = this.state;
    if (match === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{match.title}</h1>
            <p className="lead">{match.description}</p>
            <hr className="my-4" />
            <p>Answers:</p>
            {
              match.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Match;