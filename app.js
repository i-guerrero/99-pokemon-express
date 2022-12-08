// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello");
});

// New Project Name Generator
app.get("/:verb/:adjective/:noun", (req, res) => {
  const { verb, adjective, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`
  );
});

// 99 Little Bugs In the Code
app.get("/bugs", (req, res) => {
  res.send(
    `99 little bugs in the code <a href="/bugs/101">pull one down, patch it around</a>`
  );
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  let { numberOfBugs } = req.params;
  if (numberOfBugs > 200) {
    res.send(
      `${numberOfBugs} is too many bugs haha. <a href="/bugs">Click here to start over</a>`
    );
  } else {
    res.send(
      `${numberOfBugs} little bugs in the code <a href="/bugs/${
        Number(numberOfBugs) + 2
      }">pull one down, patch it around</a>`
    );
  }
});

// EXPORTS
module.exports = app;
