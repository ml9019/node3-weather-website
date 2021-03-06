const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=dac5bec21b75d1926b430b1da9acb41d&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Connectivity issue!", undefined);
    } else if (body.error) {
      callback(undefined, "Coordinates error!");
    } else {
      //console.log(body);
      callback(
        undefined,
        "Current temperature is: " +
          body.current.temperature +
          " degrees and pressure: " +
          body.current.pressure
      );
    }
  });
};

module.exports = forecast;
