import { GET_ALL_RACE, GET_DETAIL, GET_TEMPERAMENTS, SEARCH_FOR_NAME,ORDER_BY_NAME,FILTER_CREATED } from "./actions";

const initialState = {
    races: [],
    raceAll: [],
    raceDetail: [],
    temperaments: [],
};

const rootReducer =(state= initialState, action) => {
    switch (action.type) {
        case GET_ALL_RACE:
            return {
                ...state,
                races: action.payload, //en mi estado races (que está vacío en principio) mandá todo lo que te mande mi acción races
                raceAll: action.payload,
                raceDetail: action.payload //si no pondo esto acá no me anda la ruta detalle...ni idea porque! averiuguar!
            };
        case SEARCH_FOR_NAME:
            return {
                ...state,
                races: action.payload
            };
        case GET_DETAIL:
            return {
                ...state,
                raceDetail: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case ORDER_BY_NAME:
            // let sortRace = state.races 
            let sortRace = action.payload === 'Asc' ?
                state.races.sort(function (a, b){
                   if (a.name > b.name)return 1;
                   if (b.name > a.name)return -1;
                   return 0;
                }) :
                state.races.sort (function (a, b) {
                   if (a.name> b.name)return -1;
                   if (b.name> a.name)return 1;
                   return 0;
                })
                console.log(sortRace)
                return {
                   ...state,
                   races: sortRace
                };
            case FILTER_CREATED:
                const createdFilter = action.payload === 'Creadas'? state.raceAll.filter(el => el.createdInDb) : state.raceAll.filter(el=>!el.createdInDb)
                // console.log(createdFilter)
                return {
                    ...state,
                    races: createdFilter
                }       
                default: return {...state}
    }
}

export default rootReducer;