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

// Function not used - thought I had to make a list of lis with Pokemon names
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

app.get("/pokemon/search", (req, res) => {
  const { name } = req.query;
  const poke = pokemon.filter(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  if (poke) {
    res.send(poke);
  }
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const { indexOfArray } = req.params;
  if (pokemon[indexOfArray]) {
    res.send(pokemon[indexOfArray]);
  } else {
    res.send(`Sorry, no pokemon found at ${indexOfArray}`);
  }
});

// EXPORTS
module.exports = app;
