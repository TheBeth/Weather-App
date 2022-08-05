const request = require("request");

const location = (address, callback) => {
  const locationUrl = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=b75428af3bff432099aa1313810663d1`;

  request(locationUrl, (err, res, body) => {
    const data = JSON.parse(body);
    console.log(data.features);
    if (err) {
      callback("Unable to connect", undefined);
    } else if (!data.features[0]) {
      callback("Location not found", undefined);
    } else {
      const { coordinates } = data.features[0].geometry;
      let coordinate = {
        lon: coordinates[1],
        lat: coordinates[0],
      };
      callback(undefined, coordinate);
    }
  });
};

module.exports = location;
