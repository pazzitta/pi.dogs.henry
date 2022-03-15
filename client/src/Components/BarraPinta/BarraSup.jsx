import React from "react";
import { Link } from "react-router-dom";
import './BarraSup.css';

//ESCONDERLE UN BOTÓN TRASNPARENTE EN AL NOMBRE DE LA PÁG O SACAR EL NOMBRE Y PONERLO DESDE CSS Y HTML COMO LINK!s

export default function BarraSup () {
    return (
        <div >
            <div >
                <nav className="barra">
                <Link to='/home' id="click">
                  <button>hola</button>
                </Link>
                </nav>    
            </div>
            
        </div>
    )
}