import React from "react";
import './SearchBar.css'


export default function SearchBar () {
    return (
        <div>
         
           <div>
              <input type="text" placeholder="Buscar por nombre"  className="searchName"/>
              <button className="buttomPatita"></button> 
           </div>
        
        </div>
    )

}