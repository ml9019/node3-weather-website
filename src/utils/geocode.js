const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWF0ZXVzemx1a2FzaWV3aWN6IiwiYSI6ImNreno2Mm03ajA0Y2QzY29qdW93ZnB2eDAifQ.FLzjoLt2Deq4vg0l7K9H4A&limit=1%22";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect!", undefined); // or callback("Unable to connect!");
    } else if (body.features.length === 0) {
      callback("No location found", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
