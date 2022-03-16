import React from "react";
import "./Cards.css";

//FALTA ARRAGLAR LAS CARD PARA QUE TODAS LOS IMÁGENES SEAN IGUALES! Y LUEGO ORDENAMOS LOS ELEMENTOS NUEVAMENTE

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
                        <div className="temperamentoCName">TEMPERAMENTOS</div>
                           <div>{temperament}</div>
                     </div>
                     <div className="pesoC">
                        <div className="pesoCName">PESO</div>
                           <div>{weight} kg</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    )
}