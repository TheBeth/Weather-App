const express = require("express");
const path = require("path");
const hbs = require("hbs");
const location = require("../utils/location");
const weather = require("../utils/weather");
require("dotenv").config();

const app = express();

const publicDirPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const viewPath = path.join(__dirname, "../template/views");
const patialPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(patialPath);

app.use(express.static(publicDirPath));

app.get("", (req, res, next) => {
  res.render("index", { title: "Weather Page", name: "beth" });
});

app.get("/help", (req, res, next) => {
  res.render("help", { title: "Help Page", name: "bank" });
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About Page", name: "bank" });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.render("weather", {
      errorMessage: "query not found",
      name: "TheBeth",
      temp: "",
      location: "",
      district: "",
      country: "",
      weather: "",
      icon: "",
      time: "",
    });
  } else {
    location(req.query.search, (err, data) => {
      if (err) {
        return res.send(err);
      }

      weather(data, (err, data) => {
        if (err) {
          return res.send(err);
        }
        return res.render("weather", {
          name: "TheBeth",
          temp: data.current.temperature,
          location: data.location.region,
          district: data.location.name,
          country: data.location.country,
          weather: data.current.weather_descriptions[0],
          icon: data.current.weather_icons[0],
          time: data.location.localtime,
        });
      });
    });
  }

  //   res.send({
  //     forecast: "rainy",
  //     city: req.query.search,
  //   });
});

app.get("/help/*", (req, res, next) => {
  res.render("404", {
    title: "404",
    name: "Beth",
    errorMessage: "Help not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "beth",
    errorMessage: "Page not found",
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
