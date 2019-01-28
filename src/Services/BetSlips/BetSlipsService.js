import axios from 'axios';
import HttpClient from '../HttpClient';


class BetSlipsService {
  // {
  //     "matches": [{
  //         "matchId": "1145814777173199265",
  //         "variant": "Home Win"
  //     }],
  //     "cashierId": "1", <- optional
  //     "userId": "1",
  //     "deskId": "1", <- optional
  //     "money": 100
  // }
  static createBetSlip(body, successCallback, failureCallback) {
    axios.post(`${HttpClient.bet_service()}/bet-slips`, body, { headers: {'Content-Type': 'application/json'} })
      .then(response => successCallback(response))
      .catch(errors => failureCallback(errors));
  }

  static getBetSlips(options = {}, successCallback, failureCallback) {
    Object.keys(options).forEach(key => options[key] === undefined && delete options[key]);
    let queryParams = Object.keys(options).reduce((acc, key) => {
      return (acc === '') ? `?${key}=${options[key]}` : `${acc}&${key}=${options[key]}`;
    }, '');

    axios.get(`${HttpClient.bet_service()}/bet-slips${queryParams}`, { headers: {'Content-Type': 'application/json'} })
      .then(response => successCallback(response))
      .catch(errors => failureCallback(errors));
  }
}

export default BetSlipsService;