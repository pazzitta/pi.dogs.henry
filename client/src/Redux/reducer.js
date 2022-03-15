import { GET_ALL_RACE } from "./actions";

const initialState = {
    races: [],
};

const rootReducer =(state= initialState, action) => {
    switch (action.type) {
        case GET_ALL_RACE:
            return {
                ...state,
                races: action.payload
            }
    }
}

export default rootReducer;