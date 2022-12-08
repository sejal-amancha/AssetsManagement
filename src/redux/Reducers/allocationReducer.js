import * as types from '../ActionTypes/assignItemActionTypes';

const initialState = {
    allocations: [],
}

const allocationReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.NEW_ASSIGN_START:
        case types.UPDATE_ASSIGN_START:
            return {
                ...state,
            };
        case types.NEW_ASSIGN_SUCCESS:
        case types.UPDATE_ASSIGN_SUCCESS:
            return {
                ...state,   
            }
        case types.NEW_ASSIGN_ERROR:
        case types.UPDATE_ASSIGN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default allocationReducer;