import React from "react";
import s from "./css/pages.module.css";

export default function Paginado({ pokemonsPerPage, pokemonsTotales, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemonsTotales / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

    return (
        <div className={s.pages}>
            <ul>
                {pageNumbers.length && pageNumbers.map(number => (
                    <li key={number} onClick={() => paginado(number)}>{number}</li>
                ))}
            </ul>
        </div>
    )
}