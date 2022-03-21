import { GET_ALL_RACE, GET_DETAIL, GET_TEMPERAMENTS, SEARCH_FOR_NAME,ORDER_BY_NAME_AZ, ORDER_BY_NAME_ZA,FILTER_CREATED, 
    ORDER_BY_TEMPERAMENT, ORDER_BY_PESO_MIN, ORDER_BY_PESO_MAX} from "./actions";

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
        case ORDER_BY_NAME_AZ:
            // let sortRace = state.races 
            let resultsAZ = state.raceAll.sort(function(a, b){
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            return {
                ...state,
                races: resultsAZ
            }
        case ORDER_BY_NAME_ZA:
            let resultsZA = state.raceAll.sort(function(a, b){
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                races: resultsZA
            };
    
        case FILTER_CREATED:
            const createdFilter = action.payload === 'Creadas'? state.raceAll.filter(el => el.createdInDb) : state.raceAll.filter(el=>!el.createdInDb)
            // console.log(createdFilter)
            return {
                ...state,
                races: createdFilter
            };
            
        case ORDER_BY_TEMPERAMENT: 
            const filterTemp = state.raceAll.filter(dog => {
                if (!dog.temperament) return undefined;
                return dog.temperament.includes(action.payload)
            })
            console.log (filterTemp)
            return {
                ...state,
                races: filterTemp
            }
            case ORDER_BY_PESO_MIN: //ESTE ESTÁN MAL PERO NO TAN MAL! Tiene un tema cuando hay dos iguales en el primero y no tiene en cuanta el de atras. O sea, pone antes 1-5 que 1-3
            //HAY QUE HACER EL PROMEDIO!
                let resultsMin = state.raceAll.sort((a,b) => parseInt(a.weight.split(0, 3)) - parseInt(b.weight.slice(0, 3)))
                console.log(resultsMin)
                return {
                    ...state,
                    races: resultsMin
                }
            case ORDER_BY_PESO_MAX:
                let resultsMax = state.raceAll.sort((a,b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3)))
                console.log(resultsMax)
                return {
                    ...state,
                    races: resultsMax
                };
            default: return {...state}
    }
}

export default rootReducer;