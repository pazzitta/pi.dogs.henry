import React from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './DetailRace.css'
import { Link } from "react-router-dom";
import { getRaceDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function DetailRace (props) {

const dispatch = useDispatch();
const raceDetails = useSelector(state => state.raceDetail);

const id = props.match.params.id;
        
/// ANDA PERO NO PASA LA INFO DE LOS CREADOS!        
useEffect(() => {
    dispatch(getRaceDetail(id))
}, [dispatch, id]);
                       
    return (
        <div key={id}>
          
           <BarraSup/>  
           
           <div>
              <Link to='/home' id="click">
                 <button className="buttonVolverD">VOLVER</button>
              </Link>
           </div> 
{raceDetails.length > 0 ? 
           <div>
               
               <div  >
                   <img src={raceDetails[0].image? raceDetails[0].image :"https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?cs=srgb&dl=pexels-goochie-poochie-grooming-3299905.jpg&fm=jpg"} alt="La imagen no se encuentra" className="imageDetail"/>
               </div>
               <div className="nameDetail">{raceDetails[0].name}</div>
               <div className="tempNameDetail">Temperamentos</div>
               <div className="tempDetail">{raceDetails[0].temperament}</div>
               <div className="pesoNameDetail" >Peso</div>
               <div className="pesoDetail">{raceDetails[0].weight} kg</div>
               <div className="alturaNameDetail">Altura</div>
               <div className="alturaDetail">{raceDetails[0].height} cm </div>
               <div className="liveNameDetail">Años de vida</div>
               <div className="liveDetail">{raceDetails[0].life_span}</div>
            
            </div> 
         : <img className="imageDetail" src="https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?cs=srgb&dl=pexels-goochie-poochie-grooming-3299905.jpg&fm=jpg" alt="" /> }
     </div>
    )
}