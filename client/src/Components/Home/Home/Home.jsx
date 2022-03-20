import React from "react";
import { Link } from "react-router-dom";
import BarraSup from "../../BarraPinta/BarraSup";
import SearchBar from "../../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import './Home.css'
import { getAllTemperaments, orderByNameAz, orderByNameZa, filterCreated } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Homepage () {

const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();

useEffect(() => {
    dispatch(getAllTemperaments())
 },[dispatch])


const [orden, setOrden] = useState('')
const [page, setPage] = useState(1);

function handleSortName(e){
    if(e.target.value === "Asc"){
        e.preventDefault ();
        dispatch (orderByNameAz(e.target.value));
        setPage (1);
        setOrden (`Ordenado ${e.target.value}`)
    }else if(e.target.value === "Desc"){
        e.preventDefault ();
        dispatch (orderByNameZa(e.target.value));
        setPage (1);
        setOrden (`Ordenado ${e.target.value}`)
    }else{
        
    }
}


function handleFilterCreated (e) {
    dispatch(filterCreated (e.target.value))
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
            <select onChange={(e) => handleSortName (e)} className="ordenalf">
                <option value='All' disabled selected>Filtrar por orden alfabético</option>
                <option value= 'Asc'>A-Z</option>
                <option value= 'Desc'>Z-A</option>
            </select>
            <select  className="peso">
                <option disabled selected>Filtrar por peso</option>
                <option>Min-Max</option>
                <option>Max-Min</option>
            </select>  
            <select className="temperamentofil">
            <option disabled selected>Filtrar por temperamento</option>
            {dogtemperaments.map((dt)=>(
                              <option key={dt} value={dt}>{dt}</option>
                           ))}
            </select>
            <select onChange={(e) => handleFilterCreated (e)} className="razafil">
                <option value='All' disabled selected>Filtrar por raza</option>
                <option value='Existentes'>Existentes</option>
                <option value='Creadas'>Creadas</option>
            </select>           
            </div>   
           
            <div>
               <Cards/>
            </div>
        
        </div>
    )
}