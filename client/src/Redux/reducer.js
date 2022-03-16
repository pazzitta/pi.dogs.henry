import { GET_ALL_RACE } from "./actions";

const initialState = {
    races: [],
};

const rootReducer =(state= initialState, action) => {
    switch (action.type) {
        case GET_ALL_RACE:
            return {
                ...state,
                races: action.payload //en mi estado races (que está vacío en principio) mandá todo lo que te mande mi acción races
            }
            default: return state
    }
}

export default rootReducer;