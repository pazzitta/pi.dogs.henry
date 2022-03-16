import { GET_ALL_RACE, GET_DETAIL } from "./actions";

const initialState = {
    races: [],
    raceAll: [],
    raceDetail: [],
};

const rootReducer =(state= initialState, action) => {
    switch (action.type) {
        case GET_ALL_RACE:
            return {
                ...state,
                races: action.payload, //en mi estado races (que está vacío en principio) mandá todo lo que te mande mi acción races
                raceDetail: action.payload
            };
        case GET_DETAIL:
            return {
                ...state,
                raceDetail: action.payload
            };
        default: return {...state}
    }
}

export default rootReducer;