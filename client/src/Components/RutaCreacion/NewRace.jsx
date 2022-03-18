import React from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './NewRace.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllTemperaments } from "../../Redux/actions";


export default function NewRace () {

const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();
    
useEffect(() => {
    dispatch(getAllTemperaments())
},[dispatch])

    return (
        <div>
           <BarraSup/>  
           
           <div>
           <Link to='/home' id="click">
                 <button className="buttonVolver">VOLVER</button>
            </Link>
           </div>   
           
           <div className="imageF">
           
           <div>
              <form className="fondoGris">
                  <div>CREA TU PROPIA RAZA</div>
                  
                  <label>Nombre</label>
                  <input placeholder="nombre"/>
                  
                  <label>Altura</label>
                  <div>
                     <input placeholder="min"/>
                     <input placeholder="max"/>
                  </div>

                  <label>Peso</label>
                  <div>
                     <input placeholder="min"/>
                     <input placeholder="max"/>
                  </div>
                  
                  <label>Años de vida</label>
                  <input placeholder="live"/>

                  <select >
                     <option disabled selected>Elegir temperamento/s</option>
                        {dogtemperaments.map((dt)=>(
                              <option value={dt.name}>{dt.name}</option>
                           ))}
                  </select>

                  <button>CREAR</button>
                  
              </form>
           </div>
           
           </div>       
        
        </div>
    )
}
