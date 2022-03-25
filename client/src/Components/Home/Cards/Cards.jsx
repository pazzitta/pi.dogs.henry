import React, {useEffect,useState} from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllRace } from "../../../Redux/actions";
import "./Cards.css";
import Paginated from "../../Paginado/Paginated";
import { Link } from "react-router-dom";

//tengo que ponerle más estilos al paginado y hacer que no quede abajo cuando se achiqte la pantalla(lo arreglo o lo pongo arriba, 
//según el tiempo disponibles)


export default function Cards () {
    const dispatch = useDispatch(); //es para usas esa cosntante e ir despachando mis acciones, envía la info al reducer
    const estadoCard = useSelector(state => state.races); //esta cosntante trae todo lo que está en el estado de races. Ya lo tenemos disponible

    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const[cardsPerPage, setCardsPerPag ] = useState (8);
    const indexOfLastCards = currentPage * cardsPerPage;
    const indexOfFirstCards = indexOfLastCards - cardsPerPage;
    const currentCards = estadoCard.slice(indexOfFirstCards,indexOfLastCards)

    const paginateds = (pagNumber) => {
        setCurrentPage(pagNumber)
    }
 
    useEffect (()=> {                   //trae del estado las razas cuando el componente se monta
      dispatch (getAllRace())
    }, [dispatch]) //esta última parate es para que no se genere un bucle infinito de llamados, como no depende de nada el dispatch se lo podría sacar.

    // ver si puedo agragar una imagen randon para no tenerla que poner en el render del detail
    return (
       
       <div>
           <Paginated cardsPerPage={cardsPerPage} estadoCard= {estadoCard.length} paginateds = {paginateds} />
            <div className="ordenCards">
            {currentCards.map( (dogRace) => {
                   return (
                       <div key={dogRace.id} >
                           <Link to= {"/detail/" + dogRace.id} className="sinlinea">
                               {/* creo que va por acá, pero falta algo */}
                              <Card  image={dogRace.image} name={dogRace.name} temperament={dogRace.temperament} weight={dogRace.weight} /> 
                           </Link>
                       </div>
                   )}               
               )}           
            </div>
       
        </div>
        
    );
};