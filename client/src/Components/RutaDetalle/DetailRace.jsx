import React from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './DetailRace.css'
import { Link } from "react-router-dom";
import { getRaceDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//TENGO QUE LIMITAR LA FOTO A UN TAMAÑO! SINO HACE LO MISMO QUE CON LAS CARDS! Y VER PORQUÉ ESTÁ TAN GRANDELA PÁGINA, EL TOTAL DE ELLA!
export default function DetailRace (props) {

const dispatch = useDispatch();
const raceDetails = useSelector(state => state.raceDetail);

const id = props.match.params.id;
        
        
useEffect(() => {
    dispatch(getRaceDetail(id))
}, [dispatch, id]);
                       
    return (
        <div>
          
           <BarraSup/>  
           
           <div>
              <Link to='/home' id="click">
                 <button className="buttonVolverD">VOLVER</button>
              </Link>
           </div> 

           <div key={id}>
               
               <div >
                   <img src={raceDetails[0].image} alt="La imagen no se encuentra" className="imageDetail"/>
               </div>
               <div className="nameDetail">{raceDetails[0].name}</div>
               <div className="tempNameDetail">Temperamentos</div>
               <div className="tempDetail">{raceDetails[0].temperament}</div>
               <div className="pesoNameDetail" >Peso</div>
               <div className="pesoDetail">{raceDetails[0].height} kg</div>
               <div className="alturaNameDetail">Altura</div>
               <div className="alturaDetail">{raceDetails[0].weight} m </div>
               <div className="liveNameDetail">Años de vida</div>
               <div className="liveDetail">{raceDetails[0].life_span}</div>
           
           </div>  
        
        </div>
    )
}