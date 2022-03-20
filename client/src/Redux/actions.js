export const GET_ALL_RACE = 'GET_ALL_RACE';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const SEARCH_FOR_NAME = 'SEARCH_FOR_NAME';
export const ORDER_BY_NAME_AZ = 'ORDER_BY_NAME_AZ';
export const ORDER_BY_NAME_ZA = 'ORDER_BY_NAME_ZA';
export const FILTER_CREATED = 'FILTER_CREATED';
export const  ORDER_BY_TEMPERAMENT = ' ORDER_BY_TEMPERAMENT';
export const ORDER_BY_PESO_MIN = 'ORDER_BY_PESO_MIN';
export const ORDER_BY_PESO_MAX = 'ORDER_BY_PESO_MAX'

const RUTA_GET = "http://localhost:3001/dogs/get";
const RUTA_GET_TEMPERAMENTS = "http://localhost:3001/temperaments/get"

export const getAllRace = () => async dispatch => {
   return await fetch(RUTA_GET)
      .then(respose => respose.json())
      .then (json => dispatch ({type:GET_ALL_RACE, payload: json}))
      
}

export const getRaceDetail = (payload) => async dispatch => {
   // console.log (payload)
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

export const orderByNameAz = (payload) =>{
   console.log(payload)
   return {
      type: ORDER_BY_NAME_AZ,
      payload
   }
}

export const orderByNameZa = (payload) =>{
   console.log(payload)
   return {
      type: ORDER_BY_NAME_ZA,
      payload
   }
}
export const filterCreated = (payload) => {
   // console.log (payload)
   return  {
      type: FILTER_CREATED,
      payload
   }
}

export const orderByTemperaments = (payload) => {
console.log(payload)
   return {
      type: ORDER_BY_TEMPERAMENT,
      payload
   }
}

export const orderByPesoMin = (payload) => {
   console.log(payload)
   return {
      type: ORDER_BY_PESO_MIN,
      payload
   }
}

export const orderByPesoMax = (payload) => {
   console.log(payload)
   return {
      type: ORDER_BY_PESO_MAX,
      payload
   }
}

