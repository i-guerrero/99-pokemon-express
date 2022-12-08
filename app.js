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

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const { name, type } = req.query;
  console.log(name);
  console.log(type);
  let searchCriteria = "";
  if (name) {
    searchCriteria = "name";
  } else if (type) {
    searchCriteria = "type";
  }

  function filterPokemon(search) {
    if (search === "name") {
      let pokeByName = pokemon.filter((p) => {
        return p.name.toLowerCase() === name.toLowerCase();
      });
      return pokeByName;
    } else if (search === "type") {
      let pokeByType = pokemon.filter((p) => {
        return p.type
          .map((pokemonType) => pokemonType.toLowerCase())
          .includes(type.toLowerCase());
      });
      return pokeByType;
    }
  }

  console.log(searchCriteria);
  // Filter pokemon
  //   const poke = pokemon.filter((p) => {
  //     return p[searchCriteria].toLowerCase() === name.toLowerCase();
  //   });
  res.send(filterPokemon(searchCriteria));
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const { indexOfArray } = req.params;
  if (pokemon[indexOfArray]) {
    res.send(pokemon[indexOfArray]);
  } else {
    res.send(`Sorry, no pokemon found at ${indexOfArray}`);
  }
});

// BONUS

function renderPokemonList(pokemon) {
  let listStr = "<ul>";
  listStr += pokemon
    .map((poke, i) => {
      return `<li><a href="/pokemon-pretty/${i}">${poke.name}</a></li>`;
    })
    .join("");
  listStr += "</ul>";
  return listStr;
}

app.get("/pokemon-pretty", (req, res) => {
  res.send(renderPokemonList(pokemon));
});

function renderIndividualPokemon(individualPokemon) {
  const nameStr = `<h2>${individualPokemon.name}</h2>`;
  const imgStr = `<img src="${individualPokemon.img}" alt="${individualPokemon.name}"></img>`;
  // render other stats
  return nameStr + imgStr;
}

app.get("/pokemon-pretty/:index", (req, res) => {
  const { index } = req.params;
  res.send(renderIndividualPokemon(pokemon[index]));
});

// EXPORTS
module.exports = app;
