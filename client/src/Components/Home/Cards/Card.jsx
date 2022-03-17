import React from "react";
import "./Cards.css";


export default function Card ({image, name, temperament,weight}) {
    return (
        <div>
          
           <div>
              
              <div className="boxC">
                  
                  <div className= "imageC" >
                     <img className="imstam" src= {image} alt = "char-img"/>
                  </div>
                  
                  <div className="nombreC">
                        <div>{name}</div>
                  </div>
                  
                  <div className="box2C">
                    
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