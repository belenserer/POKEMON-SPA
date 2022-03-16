import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetail} from "../Redux/actions/index";
import s from "./css/details.module.css"

export default function Detail() {
    const dispatch = useDispatch();
    let { id } = useParams();
  
    useEffect(() => {
      dispatch(getDetail(id));
      // La funcion en return se ejecuta cuando el componente
      // se desmonta
      return () => dispatch(clearDetail());
    }, [dispatch, id]);
  
    const detailPokemon = useSelector((state) => state.detail);
  
    return (
            <div className={s.details}>
              {detailPokemon  && 
                <>
                  <div>
                    <h1>{detailPokemon.name}</h1>
                    <div className={s.container}>
                      <div>
                        <img
                          className={s.img}
                          src={detailPokemon.image? detailPokemon.image : 'https://p4.wallpaperbetter.com/wallpaper/699/640/867/red-pikachu-pokeballs-minimalism-wallpaper-preview.jpg'}
                          alt=""
                        />
                      </div>

                      <div>
                        <h3>TYPES</h3>
                        <div>
                          {detailPokemon.types.map((p, index) => (
                            <h4 key={index}>
                              {p}
                            </h4>
                          ))}
                        </div>
                        <div>
                          <h3>ID {detailPokemon.id} </h3>

                        </div>
                        <div>
                          <h3>HP {detailPokemon.hp}</h3>
                        </div>
                        <div>
                          <h3>ATTACK {detailPokemon.attack}</h3>
                          
                        </div>
                        <div>
                          <h3>DEFENSE {detailPokemon.defense}</h3>
                          
                        </div>
                        <div>
                          <h3>SPEED {detailPokemon.speed}</h3>
                        </div>
                        <div>
                          <h3>HEIGHT {detailPokemon.height}</h3>
                        </div>
                        <div>
                          <h3>WEIGHT {detailPokemon.weight}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }

              {!detailPokemon && "Loading"}
              <br/>
              <br/>
              <Link to="/home">
                <button className={s.button}>Back</button>
              </Link>
            </div>
    )
}