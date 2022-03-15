const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000; //heroku or 3000 if locally

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Stup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //overrides default views folder
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "HELP",
    name: "Mat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "1",
  //   location: "2",
  //   Address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
  }

  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mat",
    errorMessage: "Help article not found",
  });
});

app.get("/test", (req, res) => {
  res.render("test", {
    helpText: "This is some test page",
    title: "TEST",
    name: "Mat",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mat",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
