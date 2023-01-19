import request from "postman-request";

const url2 =
  "http://api.positionstack.com/v1/forward?access_key=2fefe5f463acf9929bc14c0fe75d216c&query=Bagru&limit=1";
var lat, lon;
request({ url: url2, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to Geolocation Service");
  } else if (response.body.error) {
    console.log(response.body.error.code);
  } else {
    lat = response.body.data[0].latitude;
    lon = response.body.data[0].longitude;
    console.log(lat, lon);
  }
});

const url =
  "http://api.weatherstack.com/current?access_key=979a28f45f9f64ed6e1422d95c62fc61&query=34.65796,73.14384" +
  request({ url: url, json: true }, (err, response) => {
    if (error) {
      console.log("Unable to connect with Weather Service");
    } else if (response.body.error) {
      console.log(response.body.error.code);
    } else {
      const body = response.body.current;
      console.log(
        "It is " + body.temperature + ". It feels like" + body.feelslike + "."
      );
    }
  });
