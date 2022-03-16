import React from "react";
import s from "./css/landing.module.css"
import {NavLink} from "react-router-dom";

export default function LandingPage(){
    return (
       <div >
            <h1 className={s.h1}>WELCOME TO POKE API</h1> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            <NavLink to={"/home"} className={s.ingresar}>
              Start
            </NavLink>
        </div>
    )
};