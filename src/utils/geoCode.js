import request from "postman-request";
import { keys } from "../../keys.js";

export const geoCode = (location, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=" +
    keys.geoKey +
    "&query=" +
    location +
    "&limit=1";

  //Using shorthand object property syntax for url
  //Also, destructuring response to get body as a standAlone variable
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation Service", undefined);
    } else if (body.data.length == 0) {
      callback("Please enter a valid location", undefined);
    } else {
      const coordinates = {
        lat: body.data[0].latitude,
        lon: body.data[0].longitude,
      };
      callback(undefined, coordinates);
    }
  });
};
