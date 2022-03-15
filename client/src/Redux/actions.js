const axios = require ('axios');
export const GET_ALL_RACE = 'GET_ALL_RACE';

const RUTA_GET = "http://localhost:3001/dogs/get";

export const getAllRace = () => async dispatch => {
   return await fetch (RUTA_GET)
      .then(respose => respose.json)
      .then (json => dispatch ({type:GET_ALL_RACE, payload: json}))
}