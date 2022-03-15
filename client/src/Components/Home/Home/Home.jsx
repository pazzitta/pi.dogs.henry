import React from "react";
import { Link } from "react-router-dom";
import BarraSup from "../../BarraPinta/BarraSup";
import './Home.css'

export default function Homepage () {
    return (
        <div>
           <BarraSup/>  
           <div>
               {/* HAY UN TEMA CON EL CLICK, SE SUPERPONENE LOS OTROS DIV Y NO REDIRIJE EN TODOS LADOS DONDE HACÉS CLICK */}
              <Link to='/create' id="click">
                 <button className="buttonCreate"></button>
              </Link>
              <div className="textCrear">CREAR</div>
              <div className="textNR">nueva raza</div>
            </div>   
        </div>
    )
}