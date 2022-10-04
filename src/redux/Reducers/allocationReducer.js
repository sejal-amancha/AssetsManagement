import * as types from '../ActionTypes/assignItemActionTypes';

const initialState = {
    allocations: [],
    loading: false,   
}

const allocationReducer = (state = initialState, action ) => {
    switch (action.type) {
        // case types.LOAD_ALLOCATIONS_START:
        case types.NEW_ASSIGN_START:
        // case types.UPDATE_ALLOCATION_START:
        // case types.DELETE_ALLOCATION_START:
            return {
                ...state,
                loading: true,
            };
        // case types.LOAD_ALLOCATIONS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         allocations: action.payload,
        //     }
        case types.NEW_ASSIGN_SUCCESS:
        // case types.UPDATE_ALLOCATION_SUCCESS:
        // case types.DELETE_ALLOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        
        // case types.LOAD_ALLOCATIONS_ERROR:
        case types.NEW_ASSIGN_ERROR:
        // case types.UPDATE_ALLOCATION_ERROR:
        // case types.DELETE_ALLOCATION_ERROR:
            return {
                ...state,
                location: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default allocationReducer;