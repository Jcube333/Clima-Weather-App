import request from "postman-request";

const url =
  "http://api.weatherstack.com/current?access_key=979a28f45f9f64ed6e1422d95c62fc61&query=26.839212,75.565417";

request({ url: url, json: true }, (err, response) => {
  const body = response.body.current;
  console.log(
    "It is " + body.temperature + ". It feels like" + body.feelslike + "."
  );
});
