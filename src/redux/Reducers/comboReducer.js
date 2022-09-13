import * as types from '../ActionTypes/comboActionTypes';

const initialState = {
    combos: [],
    comboDetails: [],
    loading: false,   
}

 const comboReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_COMBO_START:
        case types.CREATE_COMBO_START:
        case types.UPDATE_COMBO_START:
        case types.GET_COMBO_BYID_START:
        case types.DELETE_COMBO_START:
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
            case types.GET_COMBO_BYID_SUCCESS: 
                return {
                    ...state,
                    loading: false,
                    comboDetails: action.payload,
                }
        case types.CREATE_COMBO_SUCCESS:
        case types.UPDATE_COMBO_SUCCESS:
        case types.DELETE_COMBO_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case types.LOAD_COMBO_ERROR:
        case types.CREATE_COMBO_ERROR:
        case types.UPDATE_COMBO_ERROR:
        case types.GET_COMBO_BYID_ERROR:
        case types.DELETE_COMBO_ERROR:
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