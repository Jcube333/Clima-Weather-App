import { geoCode } from "./utils/geoCode.js";
import { weather } from "./utils/currentWeather.js";
import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("public"));

const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index.hbs", {
    name: "Jcube333",
  });
});

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     msg: "Need Help. Get Help",
//   });
// });

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

app.get("*", (req, res) => {
  res.send("<h1> 404 </h1><p>Page not Found.</p>");
});

app.listen(3000, () => {
  console.log("Server up and running");
});
