console.log("Hello loading...");

const weatherForm = document.querySelector("form");
const searchForm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// country.textContent = "Country Content";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchForm.value;
  messageOne.textContent = "Loading";
  messageTwo.textContent = "";

  fetch(
    `http://api.weatherstack.com/current?access_key=6185d8326d32856ab49464cddd5992cd&query=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error.info);
        messageOne.textContent = data.error.info;
      } else {
        console.log(data.current.weather_descriptions[0]);
        console.log(data.location.name, data.location.country);
        messageOne.textContent = data.location.country;
        messageTwo.textContent = data.current.weather_descriptions[0];
      }
    });
});
