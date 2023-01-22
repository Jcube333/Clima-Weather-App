import request from "postman-request";
import { keys } from "../keys.js";
export const weather = (coordinates, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    keys.weatherKey +
    "&query=" +
    coordinates.lat +
    "," +
    coordinates.lon;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect with Weather Service", undefined); //bcoz function call has a standard convention of (error,response) ...however,it's optional.
    } else if (response.body.error) {
      callback(response.body.error.code, undefined);
    } else {
      const body = response.body.current;
      callback(
        undefined,
        "It is " + body.temperature + ". It feels like " + body.feelslike + "."
      );
    }
  });
};
