const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(data => {
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
    console.log(output);
  })
  .catch(error => {
    console.log("No satellite for you!", error.message);
  });


