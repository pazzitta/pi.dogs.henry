import React from "react";
import './SearchBar.css'
import { searchForName } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";



export default function SearchBar () {
    //Buscar por nombre
const dispatch= useDispatch();
const [name, setName] = useState ('');
// const [Page, setPage] = useState(1);

function handleImputChange (e) {
    setName (e.target.value);
}

function handleSumit (e) {
    e.preventDefault()
    dispatch (searchForName(name))
    setName('')
}
    return (
        <div>
         
           <div>
              <input type="text" placeholder="Buscar por nombre" onChange={(e) => handleImputChange(e)} className="searchName"/>
              <button type="submit" onClick= {(e) => handleSumit(e)}className="buttomPatita"></button> 
           </div>
        
        </div>
    )

}