//const { response } = require("express");

console.log("Client side JavaScrit is lo1aded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //  fetch("http://localhost:3000/weather?address=" + location).then(
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = "Temperature: " + data.forecast + " degrees";
      }
    });
  });
});
