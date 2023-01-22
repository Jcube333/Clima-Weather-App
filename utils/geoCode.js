import request from "postman-request";
import { keys } from "../keys.js";

export const geoCode = (location, callback) => {
  const url2 =
    "http://api.positionstack.com/v1/forward?access_key=" +
    keys.geoKey +
    "&query=" +
    location +
    "&limit=1";

  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Geolocation Service", undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      const coordinates = {
        lat: response.body.data[0].latitude,
        lon: response.body.data[0].longitude,
      };
      callback(undefined, coordinates);
    }
  });
};
