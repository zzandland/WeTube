const axios = require('axios');
const APIkey = require('../../youtubeAPI.js');
const baseURL = 'https://www.googleapis.com/youtube/v3';

const search = (query, callback) => {
  const params = {
    q: query,
    part: 'snippet',
    order: 'relevance',
    type: 'video',
    key: APIkey,
  }
  let paramStr = '';
  for (var param in params) {
    paramStr += `&${param}=${params[param]}`;
  }
  paramStr = paramStr.slice(1);
  const url = `${baseURL}/search?${paramStr}`;
  axios.get(url)
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err, null);
    })
}

module.exports.search = search;
