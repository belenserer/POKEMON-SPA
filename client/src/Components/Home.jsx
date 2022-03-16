import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getPokemons, 
    getTypes, 
    filterCreated, 
    filterPokemonsByType, 
    sort,
    reset 
  } from '../Redux/actions';
import { NavLink, Link} from 'react-router-dom';
import Card from './Card';
import s from './css/home.module.css';
import Paginado from './Pages'
import NavBar from './NavBar';


export default function Home() {
    const dispatch = useDispatch()

    let pokemons = useSelector((state) => { 
      let pokemons = state.allPokemons.slice()

      if(state.sort === "asc") {
        pokemons = pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        })
      } else if (state.sort === "desc") {
        pokemons = pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      } else if (state.sort === "-"){
        pokemons = pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        })
      } else if (state.sort === "+"){
        pokemons = pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack> a.attack) {
            return 1;
          }
          return 0;
        })
      }

      // Filter por created

      if (state.createdFilter === "api") {
          pokemons = pokemons.filter((p) => !p.createInDb)
      }
        
      if (state.createdFilter === "created"){
          pokemons = pokemons.filter((p)=> p.createInDb)
      }

      // pokemons => all pokemons
      // Filter Types
      if (state.typeFilter !== "all") {
        pokemons = pokemons.filter((p) =>
                p.types.some(
                  (t) => t === state.typeFilter || t.name === state.typeFilter
                ))
      }
      
      return pokemons 
    });
    //console.log({pokemons})
    
    const pokemonSort = useSelector((state) => state.sort);
    const pokemonType = useSelector((state)=> state.typeFilter);
    const pokemonCreated = useSelector((state)=> state.createdFilter);

    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    let currentPokemons = [...pokemons.slice(firstPokemon, lastPokemon)];
  
    const types= useSelector((state)=> state.allTypes);
  
  
    useEffect(() => {
      dispatch(getPokemons());
      dispatch(getTypes());
    }, [dispatch]);


    function handleChange(e){
        e.preventDefault();
        dispatch(reset());
        dispatch(getPokemons());
        setCurrentPage(1)
    }
    
      function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1);
      }
    
      function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
      }
    
      function handleSort(e) {
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
      }

    return (
        <div className={s.home}>
            <br/>
            <NavLink className={s.navLink} to='/create'>
                Click here to create your own Pokemon
            </NavLink>
            <br/>
            <br/>
            <NavBar/>
            <br/>
            <button className={s.button} onClick= {e=>{handleChange(e)}}>
                Reset
            </button>
            <br/>
            <br/>
            <select className={s.select} onChange= {e=> handleSort(e)} value={pokemonSort}>
                <option value="">Sort</option>
                <option value= "asc">Name A-Z</option>
                <option value= "desc">Name Z-A</option>
                <option value= "-">Attack -</option>
                <option value= "+">Attack +</option>
            </select>
            <select className={s.select} onChange= {e=> handleFilterCreated(e)} value={pokemonCreated}>
                <option value="">Created in</option>
                <option value="all">All pokemons</option>
                <option value="api">Api</option>
                <option value="created">Created</option>
            </select>
            <select className={s.select} onChange= {e=> handleFilterType(e)} value={pokemonType}>
                <option value="">TYPES</option>
                <option value="all">All</option>
                {types?.map((t, index) => (
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}
            </select>
            <br/>
            <br/>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemonsTotales={pokemons.length}
          paginado={setCurrentPage}
        />
            
        <div className={s.cardsContainer}>
          {currentPokemons.length === 0 ? (
            <div className={s.notFoundContainer}>
              <h2>POKEMON NOT FOUND</h2>
            </div>
          ) : (
          currentPokemons?.map((p, index) => {
            return (
              <div key={p.id}>
                <Link
                  key={p.id}
                  to={`/pokemon/${p.id}`}
                >
                  <Card
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    attack={p.attack}
                  />
                </Link>
              </div>
            );
          })
        )}
        
      </div>
      <br/>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemonsTotales={pokemons.length}
        paginado={setCurrentPage}
        />
        </div>
    )
};