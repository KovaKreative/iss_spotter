const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("Something didn't work.", error);
  }
  console.log(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("No IP for you!", error);
//     return;
//   }

//   console.log("Yay! It worked! IP: ", ip);
// });

// fetchCoordsByIP('24.212.212.2', (error, data) => {
//   if(error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// });

// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   let output = "Here are the next 5 upcoming fly by times:\n";
//   for (const response of data) {
//     const time = new Date(response.risetime * 1000);
//     const duration = response.duration;
//     const t = {
//       year: time.getFullYear(),
//       month: time.getMonth(),
//       day: time.getDate(),
//       hour: time.getHours(),
//       minute: time.getMinutes()
//     };
//     const minuteAdjust = t.minute < 10 ? '0' : '';
//     output += `${t.year}/${t.month}/${t.day} at ${t.hour}:${minuteAdjust}${t.minute}\n`;
//   }
//   console.log(output);
// });