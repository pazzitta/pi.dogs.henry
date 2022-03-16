import React from "react";
import "./Cards.css";

// let prevId = 1;

export default function Card ({image, name, temperament,weight}) {
    return (
        <div>
           <div>
              <div className="boxC">
                  <div className= "imageC" >
                     <img src= {image} alt = "char-img"/>
                  </div>
                  <div className="box2C">
                     <div className="nombreC">
                        <div>{name}</div>
                     </div>
                     <div className="temperamentoC">
                     <div>{temperament}</div>
                     </div>
                     <div className="pesoC">
                         <div>{weight}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    )
}