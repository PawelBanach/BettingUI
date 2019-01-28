const BET_SERVICE = 'http://34.209.198.6:8080';
const PAYMENT_SERVICE = 'http://35.246.199.214/payments';

class HttpClient {
  static bet_service() {
    return BET_SERVICE;
  }

  static payment_service() {
    return PAYMENT_SERVICE;
  }
}

export default HttpClient;
