// const axios = require ('axios');
export const GET_ALL_RACE = 'GET_ALL_RACE';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT' 

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
// export function getRecipeDetail (payload) {
//    console.log(payload)
//    return async function (dispatch) {
//        try {
//            var json = await axios.get (`http://localhost:3002/Recipe/${payload}`);
//            return dispatch ({type: GET_DETAIL, payload: json.data})
//        } catch (error) {
//            console.log(error)
//        }
//    }
// }

export const getAllTemperaments = () => async dispatch => {
   return await fetch(RUTA_GET_TEMPERAMENTS)
      .then(respose => respose.json())
      .then (json => dispatch ({type:GET_TEMPERAMENTS, payload: json}))
      
}

export const orderByName = (payload) => {
 return {
    type: ORDER_BY_NAME,
    payload
 }
} 

export const orderByWeight = (payload) => {
   return {
      type: ORDER_BY_WEIGHT,
      payload
   }
  } 