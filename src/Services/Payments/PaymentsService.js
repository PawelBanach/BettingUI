import axios from 'axios';
import HttpClient from '../HttpClient';

const MOCKED_RESPONSE = {
  "wallet": {
    "balance": 800,
    "walletTransactions": [
      {
        "createdDate": "2019-01-13T16:01:50.546Z",
        "_id": "5c3b60ee234d647237a96b51",
        "type": "topup",
        "amount": {
          "$numberDecimal": "1000"
        },
        "betId": null
      },
      {
        "createdDate": "2019-01-13T16:03:01.690Z",
        "_id": "5c3b613544229d72a0b21470",
        "type": "withdraw",
        "amount": {
          "$numberDecimal": "200"
        }
      }
    ]
  },
  "_id": "5c3b60de234d647237a96b50",
  "createdDate": "2019-01-13T16:01:34.315Z",
  "playerId": "test1",
  "__v": 2
};

class PaymentsService {


  static getWalletInfo(userId, headers, successCallback, failureCallback) {
    axios.get(`${HttpClient.payment_service()}/api/players/${userId}`, { headers })
      .then(response => successCallback(response))
      .catch(errors => failureCallback(errors));
  }

  static createTransaction(userId, body, headers, successCallback, failureCallback) {
    debugger;
    axios.post(
      `${HttpClient.payment_service()}/api/players/${userId}/wallet`,
      body,
      { headers })
      .then(response => successCallback(response))
      .catch(errors => failureCallback(errors));
  }
}

export default PaymentsService;