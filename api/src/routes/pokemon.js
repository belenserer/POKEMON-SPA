const { Router } = require("express");
const { 
  getAllPokemons,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByNameApi,
  getPokemonByNameDb,
} = require("./controllers");
const { Pokemon, Type } = require("../db");
const router = Router();

//pokemons name

router.get("/", async (req, res, next) => {
  console.log("llega a get");
  const name = req.query.name;
  if (!name) {
    const allPokemon = await getAllPokemons();
    res.status(200).send(allPokemon);
  } else {
    console.log("llega a buscar el pokemon");
    let pokemonDb = await getPokemonByNameDb(name);
    let pokemonApi = await getPokemonByNameApi(name);

    let pokemonByName;

    if (pokemonDb && pokemonDb !== "Pokemon no encontrado") {
      pokemonByName = pokemonDb;
    }
    if (pokemonApi && pokemonApi !== "Pokemon no encontrado") {
      pokemonByName = [pokemonApi];
    }

    if (pokemonByName.length > 0) {
      console.log("llega a buscar el pokemon");
      res.status(200).send(pokemonByName);
    } else {
      console.log("entro al else de buscar o sea no encontro ninguno");
      res.send("not found");
      return "not found";
    }
  }
});

// Pokemons ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length < 5) {
      let searchIdApi = await getPokemonByIdApi(id);
      res.status(200).send(searchIdApi);
    } else {
      let searchIdDb = await getPokemonByIdDb(id);
      res.status(200).send(searchIdDb);
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

//Pokemon post

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      types,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createInDb,
    } = req.body;

    let allPokemons = await getAllPokemons();

    let repeatPokemon = allPokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (repeatPokemon.length) {
      res.status(400).send("Ya existe un Pokemon con ese nombre");
    } else {
      const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
      });

      types.map(async (t) => {
        const newType = await Type.findAll({
          where: {
            name: t,
          },
        });
        newPokemon.addType(newType[0]);
      });

      res.status(200).send("Pokemon agregado con exito");
    }
  } catch (error) {
    res.status(404).send("No se pudo agregar pokemon");
  }
});

module.exports = router;