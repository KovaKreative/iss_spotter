const request = require('request-promise-native');

const IP_FETCH_URL = 'https://api.ipify.org?format=json';
const COORDS_BY_IP_URL = 'http://ipwho.is/';
const FLY_BY_URL = 'https://iss-flyover.herokuapp.com/json/';

const fetchMyIP = function() {
  return request(IP_FETCH_URL);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(COORDS_BY_IP_URL + ip + '?fields=longitude,latitude,success,message');
};

const fetchISSFlyOverTimes = function(coords) {
  coords = JSON.parse(coords);
  const query = `?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(FLY_BY_URL + query);
};

const nextISSTimesForMyLocation = function(callback) {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
  };

  module.exports = { nextISSTimesForMyLocation };