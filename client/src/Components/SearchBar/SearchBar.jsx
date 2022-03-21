import React from "react";
import './SearchBar.css'
import { searchForName } from "../../Redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

//FALTA BOTÓN PARA REFRESCAR LA PÁGINA, con la value como name se borra el buscador! 
//cuando no estoy en la pag 0, la inicial con todoss las razas no me renderiza la búsqueda...

export default function SearchBar () {

const dispatch = useDispatch();
const [name, setName] = useState ('');

function handleInputChange (e) {
   setName (e.target.value);
}

function handleSubmit (e) {
    e.preventDefault()
    dispatch (searchForName(name))
    setName('')
    
}

    return (
        <div>
         
           <div>
              <input value={name} onChange={handleInputChange} type="text" placeholder="Buscar por nombre"  className="searchName"/>
              <button type="submit" onClick={handleSubmit} className="buttomPatita"></button> 
           </div>
        
        </div>
    )

}