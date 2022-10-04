import * as types from '../ActionTypes/actionTypes';

export const adminLoginStart = (user) => ({
    type: types.ADMIN_LOGIN_START,
    payload: user,
});

export const adminLoginSuccess = (login) => ({
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: login,
});

export const adminLoginError = (error) => ({
    type: types.ADMIN_LOGIN_ERROR,
    payload: error,
});

export const adminChangePasswordStart = (adminChangePass) => ({
    type: types.ADMIN_CHANGE_PASSWORD_START,
    payload: adminChangePass
});

export const adminChangePasswordSuccess = (changePass) => ({
    type: types.ADMIN_CHANGE_PASSWORD_SUCCESS,
    payload: changePass,
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

export const getSingleEmployeeStart = (singleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_START,
    payload: singleEmployee,
});

export const getSingleEmployeeSuccess = (singleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_SUCCESS,
    payload: singleEmployee,  
});

export const getSingleEmployeeError = (error) => ({
    type: types.GET_SINGLE_EMPLOYEE_ERROR,
    payload: error,
})

export const getSingleEmployeeAssignemntStart = (singleEmployeeItem) => ({
    type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_START,
    payload: singleEmployeeItem,
});

export const getSingleEmployeeAssignemntSuccess = (singleEmployeeItem) => ({
    type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_SUCCESS,
    payload: singleEmployeeItem,
});

export const getSingleEmployeeAssignemntError = (error) => ({
    type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_ERROR,
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

