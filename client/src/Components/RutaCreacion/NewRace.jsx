import React from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './NewRace.css'
import { Link } from "react-router-dom";


export default function NewRace () {
    return (
        <div>
           <BarraSup/>  
           <div>
           <Link to='/home' id="click">
                 <button className="buttonVolver">VOLVER</button>
            </Link>
           </div>   
        </div>
    )
}
