// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
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
    `99 little bugs in the code <a href="/bugs/101">Pull one down, patch it around</a>`
  );
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  let { numberOfBugs } = req.params;
  if (numberOfBugs >= 200) {
    res.send(`<a href="/bugs">Too many bugs!! Start over!</a>`);
  } else {
    res.send(
      `${numberOfBugs} little bugs in the code <a href="/bugs/${
        Number(numberOfBugs) + 2
      }">Pull one down, patch it around</a>`
    );
  }
});

// Poke-Express
const pokemon = require("./models/pokemon.json");

function renderPokemonList(pokemon) {
  let listStr = "<ul>";
  listStr += pokemon
    .map((poke) => {
      return `<li>${poke.name}</li>`;
    })
    .join("");
  listStr += "</ul>";
  return listStr;
}

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

// EXPORTS
module.exports = app;
