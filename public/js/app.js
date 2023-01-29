fetch("http://localhost:3000/weather?location=!").then((response) => {
  response.json().then((data) => {
    if (data.error) console.log(data.error);
    else console.log(data);
  });
});

const myForm = document.querySelector("form");
const ip = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = ip.value;
  msg1.textContent = "loading...";

  fetch("http://localhost:3000/weather?location=" + loc).then((response) => {
    response.json().then((data) => {
      if (data.error) msg1.textContent = data.error;
      else {
        msg1.textContent = "location: " + data.location;
        msg2.textContent = "Weather: " + data.Weather;
      }
    });
  });
});
