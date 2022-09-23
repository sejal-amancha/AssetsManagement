import * as types from '../ActionTypes/departmentActionTypes';

export const loadDepartmentStart = () => ({
    type: types.LOAD_DEPARTMENT_START,
});

export const loadDepartmentSuccess = (departments) => ({
    type: types.LOAD_DEPARTMENT_SUCCESS,
    payload: departments.departmentData,
});
  
export const loadDepartmentError = (error) => ({
    type: types.LOAD_DEPARTMENT_ERROR,
    payload: error,
});

export const addnewDepartmentStart = (newDepartment) => ({
    type: types.ADD_NEW_DEPARTMENT_START,
    payload: newDepartment,
});

export const addnewDepartmentSuccess = () => ({
    type: types.ADD_NEW_DEPARTMENT_SUCCESS,
});

export const addnewDepartmentError = (error) => ({
    type: types.ADD_NEW_DEPARTMENT_ERROR,
    payload: error,
});

export const updateDepartmentStart = (updateDepartment) => ({
    type: types.UPDATE_DEPARTMENT_START,
    payload: updateDepartment,
});

export const updateDepartmentSuccess = () => ({
    type: types.UPDATE_DEPARTMENT_SUCCESS,
});

export const updateDepartmentError = (error) => ({
    type: types.UPDATE_DEPARTMENT_ERROR,
    payload: error,
});

export const getSingleDepartmentStart = (singleDepartment) => ({
    type: types.GET_SINGLE_DEPARTMENT_START,
    payload: singleDepartment,
});

export const getSingleDepartmentSuccess = (singleDepartment) => ({
    type: types.GET_SINGLE_DEPARTMENT_SUCCESS,
    payload: singleDepartment,
});

export const getSingleDepartmentError = (error) => ({
    type: types.GET_SINGLE_DEPARTMENT_ERROR,
    payload: error,
})

export const deleteDepartmentStart = (deleteCategory) => ({
    type: types.DELETE_DEPARTMENT_START,
    payload: deleteCategory,
});

export const deleteDepartmentSuccess = (deleteCategory) => ({
    type: types.DELETE_DEPARTMENT_SUCCESS,
    payload: deleteCategory,
});

export const deleteDepartmentError = (error) => ({
    type: types.DELETE_DEPARTMENT_ERROR,
    payload: error,
});
