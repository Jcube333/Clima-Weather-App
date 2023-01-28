import { geoCode } from "./utils/geoCode.js";
import { weather } from "./utils/currentWeather.js";
import express from "express";

// if (!process.argv[2]) console.log("Please provide a location");
// else {
//   geoCode(process.argv[2], (error, response) => {
//     if (error) return console.log(error);

//     weather(response, (error, WeatherResponse) => {
//       if (error) return console.log(error);

//       console.log(WeatherResponse);
//     });
//   });
// }

const app = express();

app.use(express.static("public"));

app.set("view engine", "hbs");
app.get("", (req, res) => {
  res.send("Heyyy");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "Need Help. Get Help",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: "Enter an address",
    });
  }

  geoCode(location, (error, { lat, lon } = {}) => {
    if (error) return res.send({ error });

    weather({ lat, lon }, (error, WeatherResponse) => {
      if (error) return res.send({ error });

      res.send({ location, Weather: WeatherResponse });
    });
  });
});

app.listen(3000, () => {
  console.log("Server up and running");
});
