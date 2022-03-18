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
                  <div className="tituloCrear">CREA TU PROPIA RAZA</div>
                  
                  <label className="textName">Nombre</label>
                  <input className="barraName" placeholder="nombre"/>
                  
                  <label className="textAltura">Altura</label>
                  <div>
                     <input className="barraAlturaMin" placeholder="min"/>
                     <input className="barraAlturaMax" placeholder="max"/>
                  </div>

                  <label className="textPeso">Peso</label>
                  <div >
                     <input className="barraPesoMin" placeholder="min"/>
                     <input className="barraPesoMax" placeholder="max"/>
                  </div>
                  
                  <label className="textLife">Años de vida</label>
                  <input className="barraLife" placeholder="life"/>

                  <select className="selecTemp" >
                     <option disabled selected>Elegir temperamento/s</option>
                        {dogtemperaments.map((dt)=>(
                              <option value={dt.name}>{dt.name}</option>
                           ))}
                  </select>

                  <button className="crear">CREAR</button>
                  
              </form>
           </div>
           
           </div>       
        
        </div>
    )
}
