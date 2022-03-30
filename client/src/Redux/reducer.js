import { GET_ALL_RACE, GET_DETAIL, GET_TEMPERAMENTS, SEARCH_FOR_NAME,ORDER_BY_NAME_AZ, ORDER_BY_NAME_ZA,FILTER_CREATED, 
    ORDER_BY_TEMPERAMENT, ORDER_BY_PESO_MIN, ORDER_BY_PESO_MAX, POST_RACE} from "./actions";

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
        case POST_RACE:
            return{
                ...state
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
            // const generaPesoProm = (weightA, weightB) => {
            //     let a, b, c, d, prom1, prom2;
            //     let weight1 = weightA.split(" - ");
            //     let weight2 = weightB.split(" - ");
            //     a = parseInt(weight1[0]);
            //     c = parseInt(weight2[0]);
            //     b = parseInt(weight1[1]);
            //     d = parseInt(weight2[1]);
            //     prom1 = Math.ceil((a + b)  / 2);
            //     prom2 = Math.ceil((c + d) / 2);
            //     return { prom1, prom2 };
            //   };
            //   let resultsMin = state.raceAll.sort((a, b) => {
            //     let { prom1, prom2 } = generaPesoProm(a.weight, b.weight);
            //     return a > b ? 1 : a < b ? -1 : (prom1 > prom2 ? 1 : prom1 < prom2 ? -1 : 0) 
            //     // return prom1 === prom2 ? 0 : prom1 > prom2 ? 1 : -1;
            //   });
            let resultsMin = state.raceAll.sort((a,b) => parseInt(a.weight.split(" - ")[0]) - parseInt(b.weight.split(" - ")[0]))
            let resultmin1 = resultsMin.sort((a,b)=> {
                if (parseInt(a.weight.split(" - ")[0]) === parseInt(b.weight.split(" - ")[0])) {
                    console.log ("hola!")
                    return parseInt(a.weight.split(" - ")[1]) - parseInt(b.weight.split(" - ")[1])
                } else return 0;
            } )
                // let resultsMin = state.raceAll.sort((a,b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3)))
                // console.log(resultmin1)
                return {
                    ...state,
                    races: resultmin1 
                }
            case ORDER_BY_PESO_MAX:
                let resultsMax = state.raceAll.sort((a,b) => parseInt(b.weight.split(" - ")[0]) - parseInt(a.weight.split(" - ")[0]))
                let resultMax1 = resultsMax.sort((a,b)=> {
                if (parseInt(b.weight.split(" - ")[0]) === parseInt(a.weight.split(" - ")[0])) {
                    console.log ("hola!")
                    return parseInt(b.weight.split(" - ")[1]) - parseInt(a.weight.split(" - ")[1])
                } else return 0;
            } )
                // let resultsMax = state.raceAll.sort((a,b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.split(0, 3)))
                console.log(resultsMax)
                return {
                    ...state,
                    races: resultMax1
                };
            default: return {...state}
    }
}

export default rootReducer;