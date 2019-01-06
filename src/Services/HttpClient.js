import axios from 'axios';

const URL = 'https://59ff134a.ngrok.io';

class HttpClient {
  static url() {
    return URL;
  }
  // static get(url, headers = {}, successCallback, failureCallback) {
  //   axios.get(url, { headers: headers })
  //     .then(response => successCallback(camelizeKeys(response.data)))
  //     .catch(errors => failureCallback(errors.response.data.errors));
  // }
  //
  // static post(url, body = {}, headers = {}, successCallback, failureCallback) {
  //   axios.post(url, decamelizeKeys(body), { headers: headers })
  //     .then(response => successCallback(camelizeKeys(response.data)))
  //     .catch(errors => failureCallback(errors.response.data.errors));
  // }
  //
  // static put(url, body = {}, headers = {}, successCallback, failureCallback) {
  //   axios.put(url, decamelizeKeys(body), { headers: headers })
  //     .then(response => successCallback(camelizeKeys(response.data)))
  //     .catch(errors => failureCallback(errors.response.data.errors));
  // }
  //
  // static delete(url, headers = {}, successCallback, failureCallback) {
  //   axios.delete(url, { headers: headers })
  //     .then(response => successCallback(camelizeKeys(response.data)))
  //     .catch(errors => failureCallback(errors.response.data.errors));
  // }
}

export default HttpClient;
