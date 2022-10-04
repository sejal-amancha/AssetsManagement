import * as types from '../ActionTypes/comboActionTypes';

const initialState = {
    combos: [],
    comboDetails: [],
    loading: false,   
}

 const comboReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_COMBO_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_COMBO_SUCCESS:
            return {
                 ...state,
                loading: false,
                combos: action.payload,
            }
        case types.LOAD_COMBO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default comboReducer;