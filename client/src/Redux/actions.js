// const axios = require ('axios');
export const GET_ALL_RACE = 'GET_ALL_RACE';
export const GET_DETAIL = 'GET_DETAIL'

const RUTA_GET = "http://localhost:3001/dogs/get";

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
