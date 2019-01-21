import axios from 'axios';

const BET_SERVICE = 'https://59ff134a.ngrok.io';
const PAYMENT_SERVICE = 'http://501f07f6.ngrok.io';

class HttpClient {
  static bet_service() {
    return BET_SERVICE;
  }

  static payment_service() {
    return PAYMENT_SERVICE;
  }
}

export default HttpClient;
