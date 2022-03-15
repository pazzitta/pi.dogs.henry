import React, {useEffect,useState} from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllRace } from "../../../Redux/actions";
import "./CardS.css";
// import Paginated from "../Paginado/Paginated";
import { Link } from "react-router-dom";

// let prevId = 1;  key={prevId++} 

export default function Cards () {
    const dispatch = useDispatch(); //es para usas esa cosntante e ir despachando mis acciones
    const estadoCard = useSelector(state => state.races); //esta cosntante trae todo lo que está en el estado de races

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
            {/* <Paginated cardsPerPage={cardsPerPage} estadoCard= {estadoCard.length} paginateds = {paginateds} /> */}

            <div className="ordenCS">
               {currentCards?.map ( (races) => {
                   return (
                       <div key={recipe.id} >
                           <Link to= {"/detail/" + races.id}>
                              <Card  image={recipe.image} name={recipe.name} dietType={recipe.dietType}  />
                           </Link>
                       </div>
                   )}               
               )}
           </div>
        </div>
        
    );
};
//creo que este es el map que debo modificar