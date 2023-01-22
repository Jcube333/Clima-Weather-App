import request from "postman-request";
import { keys } from "../keys.js";

//Using JS object destructuring to avoid writing coodinates.lat and coordinates.lon
export const weather = ({ lat, lon }, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    keys.weatherKey +
    "&query=" +
    lat +
    "," +
    lon;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect with Weather Service", undefined); //bcoz function call has a standard convention of (error,response) ...however,it's optional.
    } else if (body.error) {
      callback(body.error.code, undefined);
    } else {
      const current = body.current;
      callback(
        undefined,
        "It is " +
          current.temperature +
          ". It feels like " +
          current.feelslike +
          "."
      );
    }
  });
};
