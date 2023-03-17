const request = require('request');

const IP_FETCH_URL = 'https://api.ipify.org?format=json';
const COORDS_BY_IP_URL = 'http://ipwho.is/';
const FLY_BY_URL = 'https://iss-flyover.herokuapp.com/json/';

const fetchMyIP = function(callback) {
  request(IP_FETCH_URL, (error, response, body) => {
    if (error) {
      return callback("There was an error:\n" + error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP.`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(COORDS_BY_IP_URL + ip + '?fields=longitude,latitude,success,message', (error, response, body) => {
    if (error) {
      return callback("There was an error:\n" + error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates.`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      callback(data.message, null);
      return;
    }
    delete data.success;
    callback(null, data);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const query = `?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(FLY_BY_URL + query, (error, response, body) => {
    if (error) {
      return callback("There was an error:\n" + error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly by data.`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("No IP for you!", error);
      return;
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let output = "Here are the next 5 upcoming fly by times:\n";
        for (const response of data) {
          const time = new Date(response.risetime * 1000);
          const duration = response.duration;
          const t = {
            year: time.getFullYear(),
            month: time.getMonth(),
            day: time.getDate(),
            hour: time.getHours(),
            minute: time.getMinutes()
          };
          const minuteAdjust = t.minute < 10 ? '0' : '';
          output += `${t.year}/${t.month}/${t.day} at ${t.hour}:${minuteAdjust}${t.minute}\n`;
        }
        callback(null, output);
      });
    });
  });




};

module.exports = { nextISSTimesForMyLocation };