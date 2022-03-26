import React from "react";

export default function Paginated ({cardsPerPage, estadoCard, paginateds}) {
    const pageNumber =[];
    for (let i = 1; i <= Math.ceil(estadoCard/cardsPerPage); i++) {
        pageNumber.push(i);
    }
    
    return (
        <nav>
        <ul className="paginado" >
            {pageNumber && pageNumber.map (number => (
                <li className="nums" key = {number}>
                    <a onClick={()=> paginateds(number)}>{number}</a>
                </li>
            ))}
        </ul>
      </nav>
    )
}
