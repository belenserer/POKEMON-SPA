import React from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { postPokemon, getTypes, getPokemons } from "../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import s from './css/created.module.css'

const stats = {
  hp: {
    min: 1,
    max: 500,
  },
  attack: {
    min: 1,
    max: 500,
  },
  defense: {
    min: 1,
    max: 400,
  },
  speed: {
    min: 1,
    max: 100,
  },
  height: {
    min: 1,
    max: 300,
  },
  weight: {
    min: 1,
    max: 1500,
  },
};


const placeholder = {
  hp: `${stats.hp.min}-${stats.hp.max} `,
  attack: `${stats.attack.min}-${stats.attack.max} `,
  defense: `${stats.defense.min}-${stats.defense.max} `,
  speed: `${stats.speed.min}-${stats.speed.max} `,
  height: `${stats.height.min}-${stats.height.max} `,
  weight: `${stats.weight.min}-${stats.weight.max} `,
  image: `https://web/img.jpg`,
};

//Regular expresion
let regularUrl = /^(ftp|http|https):\/\/[^ "]+$/;
let regularName = /^[a-z]+$/i;
let regularNum = /^([0-9])*$/;


//Validator form
function validate(input) {
  let error = {};

  if (
    !regularName.test(input.name) ||
    input.name.length < 3 ||
    input.name.length > 10
  ) {
    error.name = `NAME is required and must contain between 3 and 10 characters`;
  }
  if (input.types.length < 0 || input.types.length > 2) {
    error.types = "TYPES is required max 2 types";
  }
  if (
    !regularNum.test(input.hp) ||
    input.hp < stats.hp.min ||
    input.hp > stats.hp.max
  ) {
    error.hp = `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`;
  }
  if (
    !regularNum.test(input.attack) ||
    input.attack < stats.attack.min ||
    input.attack > stats.attack.max
  ) {
    error.attack = `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`;
  }
  if (
    !regularNum.test(input.defense) ||
    input.defense < stats.defense.min ||
    input.defense > stats.defense.max
  ) {
    error.defense = `DEFENSE is required and must be a number between ${stats.defense.min} - ${stats.defense.max}`;
  }
  if (
    !regularNum.test(input.speed) ||
    input.speed < stats.speed.min ||
    input.speed > stats.speed.max
  ) {
    error.speed = `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`;
  }
  if (
    !regularNum.test(input.height) ||
    input.height < stats.height.min ||
    input.height > stats.height.max
  ) {
    error.height = `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`;
  }
  if (
    !regularNum.test(input.weight) ||
    input.weight < stats.weight.min ||
    input.weight > stats.weight.max
  ) {
    error.weight = `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`;
  }
  if (input.image.length > 0 && !regularUrl.test(input.image)) {
    error.image = "IMAGE must be a valid URL";
  }
  return error;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.allTypes);
  const allPokemons = useSelector((state) => state.allPokemons);
  const [error, setError] = useState({
    name: "NAME is required and must contain between 3 and 10 characters",
    types: "TYPES is required max 2 types",
    hp: `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`,
    attack: `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`,
    defense: `DEFENSE is required and must be a number between ${stats.defense.min} - ${stats.defense.max}`,
    speed: `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`,
    height: `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`,
    weight: `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`,
    image: "IMAGE is required",
  });
  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.types.indexOf(e.target.value) === -1 && input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();


    const repeatPokemon = checkRepeat(input.name);

    if (repeatPokemon !== "Pokemon existente") {
      dispatch(postPokemon(input));
      alert("Pokemon created succesfully");

      setInput({
        name: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
      });

      setError({
        name: "NAME is required and must contain between 3 and 10 characters",
        types: "TYPES is required max 2 types",
        hp: `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`,
        attack: `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`,
        defense: `DEFENSE is required and must be a number betwee ${stats.defense.min} - ${stats.defense.max}`,
        speed: `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`,
        height: `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`,
        weight: `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`,
        image: "a",
      });
    } else {
      alert(repeatPokemon);

      setInput({
        name: "",
        types: input.types,
        hp: input.hp,
        attack: input.attack,
        defense: input.defense,
        speed: input.speed,
        height: input.height,
        weight: input.weight,
        image: input.image,
      });

      setError({
        name: "NAME already exist",
        types: error.types,
        hp: error.hp,
        attack: error.attack,
        defense: error.defense,
        speed: error.speed,
        height: error.height,
        weight: error.weight,
        image: error.image,
      });
    }
  }

  function handleDelete(ty, e) {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ty),
    });

    if (input.types.length === 1) {
      setError(
        validate({
          ...input,
          types: "TYPES is required max 2 types",
        })
      );
    }
  }

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function checkRepeat(name) {
    const repeat = allPokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (repeat.length > 0) {
      return "Pokemon already exist";
    }
  }

  return (
    <div>
      <div className={s.buttonContainer}>
        <Link to="/home">
          <button className={s.button}>BACK</button>
        </Link>
      </div>
      <h1>CREATE YOUR POKEMON</h1>
      <div>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={s.form}
            action=""
          >
            <div className={s.divContent}>
              <label> Name </label>

              <input
                onChange={(e) => handleChange(e)}
                value={input.name}
                type="text"
                name="name"
              />
              <br/>
              {error.name && (
                        <span className={s.error}>{error.name}</span>
                        )}
            </div>
            <div className={s.divContent}>
              <label> Types </label>
              <select onChange={(e) => handleSelect(e)}>
                {types.map((t, index) => (
                  <option
                    key={index}
                    value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
              {error.types && (
                        <span className={s.error}>{error.types}</span>
                        )}
              <div className={s.types}>
                {input.types.map((ty, index) => (
                  <div key={index} className={s.selectedType}>
                    <p>
                      {ty}
                      {" "}
                      <span className={s.xButton} onClick={(e) => handleDelete(ty, e)}>
                        x
                      </span>
                    </p>
                    
                  </div>
                ))}
              </div>
            </div>

            <div className={s.divContent}>
                <label> Hp </label>
                  <input 
                    onChange={(e) => handleChange(e)}
                    value={input.hp}
                    type="number"
                    name="hp"
                    placeholder={placeholder.hp}
                  />
                  {error.hp && (
                        <span className={s.error}>{error.hp}</span>
                        )}
              </div>
              <div className={s.divContent}>
                <label> Attack </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={input.attack}
                    type="number"
                    name="attack"
                    placeholder={placeholder.attack}
                  />
                  {error.attack && (
                        <span className={s.error}>{error.atack}</span>
                        )}
              </div>

              <div className={s.divContent}>
                <label> Defense </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={input.defense}
                    type="number"
                    name="defense"
                    placeholder={placeholder.defense}
                  />
                  {error.defense && (
                        <span className={s.error}>{error.defense}</span>
                        )}
              </div>

            
              <div className={s.divContent}>
                <label> Speed </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={input.speed}
                    type="number"
                    name="speed"
                    placeholder={placeholder.speed}
                  />
                  {error.speed && (
                        <span className={s.error}>{error.speed}</span>
                        )}
              </div>
              <div className={s.divContent}>
                <label> Height </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={input.height}
                    type="number"
                    name="height"
                    placeholder={placeholder.height}
                  />
                  <br/>
                  {error.height && (
                        <span className={s.error}>{error.height}</span>
                        )}
              </div>
              <div className={s.divContent}>
                <label> Weight </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={input.weight}
                    type="number"
                    name="weight"
                    placeholder={placeholder.weight}
                  />
                  <br/>
                  {error.weight && (
                        <span className={s.error}>{error.weight}</span>
                        )}
              </div>

            <div className={s.divContent}>
              <label> Image </label>
              <input
                onChange={(e) => handleChange(e)}
                value={input.image}
                type="text"
                name="image"
                placeholder={placeholder.image}
              />
              <br/>
                  {error.image && (
                        <div className={s.error}>{error.image}</div>
                        )}
            </div>

            {!error.name &&
            !error.types &&
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.height &&
            !error.weight &&
            !error.image ? (
              <button className={s.button} type="submit">
                Create pokemon
              </button>
            ) : (
              <button className={s.disabled}type="submit" disabled>
                Create pokemon
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}