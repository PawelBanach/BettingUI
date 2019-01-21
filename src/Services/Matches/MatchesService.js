import axios from 'axios';
import HttpClient from '../HttpClient';


class MatchesService {
  // {
  //     "pagination": {
  //         "page": 0,
  //         "pageSize": 10
  //     },
  //     "from": ...,
  //     "to": ...,
  // }
  static getMatches(options, successCallback, failureCallback) {
    axios.post(`${HttpClient.bet_service()}/matches`, options, { headers: {'Content-Type': 'application/json'} })
      .then(response => successCallback(response))
      .catch(errors => failureCallback(errors));

  }
}

export default MatchesService;