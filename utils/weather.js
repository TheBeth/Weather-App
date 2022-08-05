const request = require("request");

const weather = (data, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6185d8326d32856ab49464cddd5992cd&query=${data.lon},${data.lat}`;
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { location, current } = body;
      console.log(
        "\x1b[33mLocation" + " : " + location.region + ", " + location.country
      );
      console.log(
        `It is currently ${current.temperature} degree out , there is a ${
          current.precip * 100
        }% chance of rain`
      );
      callback(undefined, body);
    }
  });
};

module.exports = weather;
