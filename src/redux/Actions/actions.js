import * as types from '../ActionTypes/actionTypes';

export const adminLoginStart = (user) => ({
    type: types.ADMIN_LOGIN_START,
    payload: user,
});

export const adminLoginSuccess = () => ({
    type: types.ADMIN_LOGIN_SUCCESS,
});

export const adminLoginError = (error) => ({
    type: types.ADMIN_LOGIN_ERROR,
    payload: error,
});

export const adminChangePasswordStart = (adminChangePass) => ({
    type: types.ADMIN_CHANGE_PASSWORD_START,
    payload: adminChangePass
});

export const adminChangePasswordSuccess = () => ({
    type: types.ADMIN_CHANGE_PASSWORD_SUCCESS,
});

export const adminChangePasswordError = (error) => ({
    type: types.ADMIN_CHANGE_PASSWORD_ERROR,
    payload: error
});

export const adminLogoutStart = () => ({
    type: types.ADMIN_LOGOUT_START
});

export const adminLogoutSuccess = () => ({
    type: types.ADMIN_LOGOUT_SUCCESS,
});

export const adminLogoutError = () => ({
    type: types.ADMIN_LOGOUT_ERROR,
});

export const loadUsersStart = () => ({
    type: types.LOAD_USERS_START,
});

export const loadUsersSuccess = (users) => ({
    type: types.LOAD_USERS_SUCCESS,
    payload: users.data,
});
  
export const loadUsersError = (error) => ({
    type: types.LOAD_USERS_ERROR,
    payload: error,
});

export const addNewEmployeeStart = (newEmployee) => ({
    type: types.ADD_NEW_EMPLOYEE_START,
    payload: newEmployee,
});

export const addNewEmployeeSuccess = () => ({
    type: types.ADD_NEW_EMPLOYEE_SUCCESS, 
});

export const addNewEmployeeError = (error) => ({
    type: types.ADD_NEW_EMPLOYEE_ERROR,
    payload: error,
});

export const updateEmployeeStart = (updateEmployee) => ({
    type: types.UPDATE_EMPLOYEE_START,
    payload: updateEmployee,
});

export const updateEmployeeSuccess = () => ({
    type: types.UPDATE_EMPLOYEE_SUCCESS,
});

export const updateEmployeeError = (error) => ({
    type: types.UPDATE_EMPLOYEE_ERROR,
    payload: error,
});

export const deleteEmployeeStart = (employeeId) => ({
    type: types.DELETE_EMPLOYEE_START,
    payload: employeeId,
});

export const deleteEmployeeSuccess = (employeeId) => ({
    type: types.DELETE_EMPLOYEE_SUCCESS,
    payload: employeeId,
});

export const deleteEmployeeError = (error) => ({
    type: types.DELETE_EMPLOYEE_ERROR,
    payload: error,
});
