import React from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './DetailRace.css'
import { Link } from "react-router-dom";


export default function DetailRace () {
    return (
        <div>
           <BarraSup/>  
           <div>
           <Link to='/home' id="click">
                 <button className="buttonVolverD">VOLVER</button>
            </Link>
           </div>   
        </div>
    )
}