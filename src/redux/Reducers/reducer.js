import * as types from '../ActionTypes/actionTypes';

const initialState = {
    users: [],
    loading: false,
}

const usersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_USERS_START:
        case types.ADMIN_LOGIN_START:
        case types.ADMIN_CHANGE_PASSWORD_START:
        case types.ADMIN_LOGOUT_START:
        case types.ADD_NEW_EMPLOYEE_START:
        case types.UPDATE_EMPLOYEE_START:
        case types.DELETE_EMPLOYEE_START:
            return {
                ...state,
                loading: true,
            };
            case types.LOAD_USERS_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  users: action.payload,
                };
        case types.ADMIN_LOGIN_SUCCESS:
        case types.ADMIN_CHANGE_PASSWORD_SUCCESS:
        case types.ADMIN_LOGOUT_SUCCESS:
        case types.ADD_NEW_EMPLOYEE_SUCCESS:
        case types.UPDATE_EMPLOYEE_SUCCESS:
        case types.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: true,   
            };
        case types.ADMIN_LOGIN_ERROR:
        case types.ADMIN_CHANGE_PASSWORD_ERROR:
        case types.ADMIN_LOGOUT_ERROR:
        case types.LOAD_USERS_ERROR:
        case types.ADD_NEW_EMPLOYEE_ERROR:
        case types.UPDATE_EMPLOYEE_ERROR:
        case types.DELETE_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;