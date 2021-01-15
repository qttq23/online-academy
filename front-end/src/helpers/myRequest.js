

// this file handles requesting to server

const axios = require('axios');


async function myRequest(config, okCallback, failCallback) {

  axios({
    method: config.method,
    url: config.url,
    params: config.params,
    headers: config.headers,
    data: config.data


  })
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);

      okCallback(response)
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('Error request: ', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error setup: ', error.message);
      }

      failCallback(error)
    });
}


export default myRequest;





