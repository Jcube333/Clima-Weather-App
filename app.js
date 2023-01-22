import { geoCode } from "./utils/geoCode.js";
import { weather } from "./utils/currentWeather.js";

if (!process.argv[2]) console.log("Please provide a location");
else {
  geoCode(process.argv[2], (error, response) => {
    if (error) return console.log(error);

    weather(response, (error, WeatherResponse) => {
      if (error) return console.log(error);

      console.log(WeatherResponse);
    });
  });
}
