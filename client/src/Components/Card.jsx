import React from "react";
import s from "./css/card.module.css";


export default function Card({ name, types, image, attack }) {

  let typePokemon = types.map((e, i) => {
    const nameType = e.name ? e.name : e;
    return (
      <h5 key={i}>
        {nameType}
      </h5>
    );
  });
  const img = image? image : 'https://p4.wallpaperbetter.com/wallpaper/699/640/867/red-pikachu-pokeballs-minimalism-wallpaper-preview.jpg'
  return (
    <div className={s.card}>
      <h3 >{name}</h3>
      <img className={s.img} src={img} alt="img not found" />
      <div>{typePokemon}</div>
      <div>
          <h3>{attack}</h3>
      </div>
    </div>
  );
}