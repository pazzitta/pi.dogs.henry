import { GET_ALL_RACE, GET_DETAIL, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./actions";

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
                raceAll: action.payload
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
        let sortByName = state.races;
        sortByName = action.payload === 'asc' ?
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
            return {
            ...state,
            races: sortByName,
        };
        //ver como hacer para que lea solo los primeros dos indices del array y evalue a ambos para determinar
        case ORDER_BY_WEIGHT:
            let weightSort = [...state.races]
            weightSort = action.payload === 'asc' ?
         state.races.sort(function (a, b){
            if (a.weight[0] > b.weight[0])return 1;
            if (b.weight[0] > a.weight[0])return -1;
            return 0;
        }):
         state.races.sort (function (a, b) {
            if (a.weight[0] > b.weight[0])return -1;
            if (b.weight[0] > a.weight[0])return 1;
            return 0;
         })

         return {
            ...state,
            races: weightSort
         };
        default: return {...state}
    }
}

export default rootReducer;