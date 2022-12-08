import { retry } from 'redux-saga/effects';
import * as types from '../ActionTypes/comboActionTypes';

const initialState = {
    combos: [],
    comboDetails: [],
    items: [],
   }

 const comboReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_COMBO_START:
        case types.GET_SINGLE_COMBO_START:
        case types.GET_ITEMS_BY_CATEGORY_START:
            return {
                ...state,
            };
        case types.LOAD_COMBO_SUCCESS:
            return {
                 ...state,
                combos: action.payload,
            }
        case types.GET_SINGLE_COMBO_SUCCESS:
            return {
                ...state,
                comboDetails: action.payload,
            }
        case types.GET_ITEMS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                items: action.payload,
            }
        case types.LOAD_COMBO_ERROR:
        case types.GET_SINGLE_COMBO_ERROR:
        case types.GET_ITEMS_BY_CATEGORY_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default comboReducer;