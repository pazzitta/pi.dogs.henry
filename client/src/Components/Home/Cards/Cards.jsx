import React, {useEffect,useState} from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllRace } from "../../../Redux/actions";
import "./Cards.css";
// import Paginated from "../Paginado/Paginated";
import { Link } from "react-router-dom";

// let prevId = 1;  key={prevId++} 

export default function Cards () {
    const dispatch = useDispatch(); //es para usas esa cosntante e ir despachando mis acciones, envía la info al reducer
    const estadoCard = useSelector(state => state.races); //esta cosntante trae todo lo que está en el estado de races. Ya lo tenemos disponible

    // //paginado
    // const [currentPage, setCurrentPage] = useState(1);
    // const[cardsPerPage, setCardsPerPag ] = useState (9);
    // const indexOfLastCards = currentPage * cardsPerPage;
    // const indexOfFirstCards = indexOfLastCards - cardsPerPage;
    // const currentCards = estadoCard.slice(indexOfFirstCards,indexOfLastCards)

    // const paginateds = (pagNumber) => {
    //     setCurrentPage(pagNumber)
    // }
 
    useEffect (()=> {                   //trae del estado las razas cuando el componente se monta
      dispatch (getAllRace())
    }, [dispatch]) //esta última parate es para que no se genere un bucle infinito de llamados

    return (
        <div>
            {estadoCard.length && estadoCard.map( (dogRace) => {
                   return (
                       <div key={dogRace.id} >
                           <Link to= {"/detail/" + dogRace.id}>
                              <Card  image={dogRace.image} name={dogRace.name} temperament={dogRace.temperament} weight={dogRace.weight}  />
                           </Link>
                       </div>
                   )}               
               )}           
           {/* <h2>Mis cards</h2>
           {estadoCard.length && estadoCard.map( dogRace => 
            <Card name={dogRace.name} image={dogRace.image} temperament={dogRace.temperament} weight={dogRace.weight} />)} */}
        </div>
        
    );
};
//creo que este es el map que debo modificar