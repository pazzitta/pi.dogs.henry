export const GET_ALL_RACE = 'GET_ALL_RACE';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const SEARCH_FOR_NAME = 'SEARCH_FOR_NAME';

const RUTA_GET = "http://localhost:3001/dogs/get";
const RUTA_GET_TEMPERAMENTS = "http://localhost:3001/temperaments/get"

export const getAllRace = () => async dispatch => {
   return await fetch(RUTA_GET)
      .then(respose => respose.json())
      .then (json => dispatch ({type:GET_ALL_RACE, payload: json}))
      
}

export const getRaceDetail = (payload) => async dispatch => {
   console.log (payload)
   return await fetch(`http://localhost:3001/dogs/${payload}`)
   .then (respose => respose.json())
   .then (json => dispatch ({type: GET_DETAIL, payload: json} ))
}

export const getAllTemperaments = () => async dispatch => {
   return await fetch(RUTA_GET_TEMPERAMENTS)
      .then(respose => respose.json())
      .then (json => dispatch ({type:GET_TEMPERAMENTS, payload: json}))
      
}

export const searchForName = (payload) => async dispatch => {
  try {
     return await fetch (`${RUTA_GET}/?name=${payload}`)
     .then (respose => respose.json())
     .then (json => dispatch ({type: SEARCH_FOR_NAME, payload:json}))
  }catch {
     return alert ('No se encontró la raza,intente con otra')
  }
}