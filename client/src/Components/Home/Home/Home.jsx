import React from "react";
import { Link } from "react-router-dom";
import BarraSup from "../../BarraPinta/BarraSup";
import SearchBar from "../../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import './Home.css'
import { getAllTemperaments } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Homepage () {

const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();

useEffect(() => {
    dispatch(getAllTemperaments())
 },[dispatch])


    return (
        <div>
           <BarraSup/>  
           <SearchBar/>  
           <div>
               {/* HAY UN TEMA CON EL CLICK, SE SUPERPONENE LOS OTROS DIV Y NO REDIRIJE EN TODOS LADOS DONDE HACÉS CLICK */}
              <Link to='/create' id="click">
                 <button className="buttonCreate"></button>
              </Link>
                 <div className="textCrear">CREAR</div>
                 <div className="textNR">nueva raza</div>
            </div>
            <div> probando push</div>
            
            <div className="ubicTodos">
            <select className="ordenalf">
                <option disabled selected>Filtrar por orden alfabético</option>
                <option>A-Z</option>
                <option>Z-A</option>
            </select>
            <select className="peso">
                <option disabled selected>Filtrar por peso</option>
                <option>Min-Max</option>
                <option>Max-Min</option>
            </select>  
            <select className="temperamentofil">
            <option disabled selected>Filtrar por temperamento</option>
            {dogtemperaments.map((dt)=>(
                              <option value={dt.name}>{dt.name}</option>
                           ))}
                {/* <option disabled selected>Filtrar por temperamento</option> 
                ACA HAY QUE TRAER TODOS LOS TEMPERAMENTOS */}
            </select>
            <select className="razafil">
                <option disabled selected>Filtrar por raza</option>
                <option>Existentes</option>
                <option>Creadas</option>
            </select>           
            </div>   
           
            <div>
               <Cards/>
            </div>
        
        </div>
    )
}