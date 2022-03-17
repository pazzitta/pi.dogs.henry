import React from "react";
import { Link } from "react-router-dom";
import BarraSup from "../../BarraPinta/BarraSup";
import SearchBar from "../../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import './Home.css'
import { getAllTemperaments,orderByName, orderByWeight } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Homepage () {

//traer temperamentos
const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();

useEffect(() => {
    dispatch(getAllTemperaments())
 },[dispatch])

//sort Alfabético
const [orden, setOrden] = useState('')
const [page, setPage] = useState(1);

function handleSortName (e) { ///ME DICE QUE LA "VALUE" ES UNDEFINED
    e.preventDefault ();
    dispatch (orderByName (e.target.value));
    setPage (1);
    setOrden (`Order ${e.traget.value}`);
}

//sort weight
function handleWeightSort(e) {
    e.preventDefault();                
    dispatch(orderByWeight(e.target.value));
    setPage(1);
    setOrden(`Order ${e.target.value}`);
 }

    return (
        <div>
           <BarraSup/>  
           <SearchBar/>  
           <div>
        
              <Link className="sinlinea" to='/create' id="click">
                 <button className="buttonCreate"></button>
                 <div className="textCrear">CREAR</div>
                 <div className="textNR">nueva raza</div>
              </Link>
                 
            </div>
            
            <div className="ubicTodos">
            
            {/* HACE LO MISMO QUE ANTES, LOS ORDENA CON OTRO CAMBIO! Lo voy a tener que hacer desde el back */}
               <select onChange={e => handleSortName (e)} className="ordenalf">
                  <option disabled selected>Ordenar alfabéticamente</option>
                  <option value= 'asc'>A-Z</option>
                  <option value= 'desc'>Z-A</option>
               </select>
            
               <select  onChange={handleWeightSort}className="peso">
                  <option disabled selected>Filtrar por peso</option>
                  <option value= 'asc'>Min-Max</option>
                  <option value='desc'>Max-Min</option>
               </select>  
            
               <select className="temperamentofil">
                  <option disabled selected>Filtrar por temperamento</option>
                  {dogtemperaments.map((dt)=>(
                              <option value={dt.name}>{dt.name}</option>
                           ))}
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