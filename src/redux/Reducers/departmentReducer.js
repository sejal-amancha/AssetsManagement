import * as types from '../ActionTypes/departmentActionTypes';

const initialState = {
    departments: [],
    departmentsDetails: [],
    loading: false,   
}

const departmentReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_DEPARTMENT_START:
        case types.ADD_NEW_DEPARTMENT_START:
        case types.GET_SINGLE_DEPARTMENT_START:
        case types.UPDATE_DEPARTMENT_START:
        case types.DELETE_DEPARTMENT_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOAD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: action.payload,
            }
        case types.GET_SINGLE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departmentsDetails: action.payload,
            }
        case types.ADD_NEW_DEPARTMENT_SUCCESS:
        case types.UPDATE_DEPARTMENT_SUCCESS:
        case types.DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case types.LOAD_DEPARTMENT_ERROR:
        case types.ADD_NEW_DEPARTMENT_ERROR:
        case types.GET_SINGLE_DEPARTMENT_ERROR:
        case types.UPDATE_DEPARTMENT_ERROR:
        case types.DELETE_DEPARTMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default departmentReducer;