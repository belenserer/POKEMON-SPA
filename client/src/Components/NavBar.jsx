import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../Redux/actions";
import s from "./css/navBar.module.css";

export default function NavBar(){
    const distpach = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if (name) {
            distpach(searchByName(name));
          } else alert("Search is empty!")
        setName("")
    }

    return (
        <div className={s.navBar_div}>
            <input 
            type= 'text' 
            placeholder="Search Pokemons"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            onChange = {(e) => handleInputChange(e)}
            value={name}
            />
            <button type='submit' onClick= {(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}