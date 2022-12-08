import * as types from '../ActionTypes/assignItemActionTypes';

export const newAssignStart = (newAssign) => ({
    type: types.NEW_ASSIGN_START,
    payload: newAssign,
});

export const newAssignSuccess = () => ({
    type: types.NEW_ASSIGN_SUCCESS,
});

export const newAssignError = (error) => ({
    type: types.NEW_ASSIGN_ERROR,
    payload: error,
});

export const updateAssignStart = (newAssign) => ({
    type: types.UPDATE_ASSIGN_START,
    payload: newAssign,
});

export const updateAssignSuccess = () => ({
    type: types.UPDATE_ASSIGN_START,
});

export const updateAssignError = (error) => ({
    type: types.NEW_ASSIGN_ERROR,
    payload: error,
});

