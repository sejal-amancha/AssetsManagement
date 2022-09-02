import * as types from '../ActionTypes/comboActionTypes';

export const loadComboStart = () => ({
    type: types.LOAD_COMBO_START,
});

export const loadComboSuccess = (comboData) => ({
    type: types.LOAD_COMBO_SUCCESS,
    payload: comboData.data,
});

export const loadComboError = (error) => ({
    type: types.LOAD_COMBO_ERROR,
    payload: error,
});

export const createComboStart = (comboData) => ({
    type: types.CREATE_COMBO_START,
    payload: comboData,
});

export const createComboSuccess = () => ({
    type: types.CREATE_COMBO_SUCCESS,
});
  
export const createComboError = (error) => ({
    type: types.CREATE_COMBO_ERROR,
    payload: error,
});

export const updateComboStart = (comboData) => ({
    type: types.UPDATE_COMBO_START,
    payload: comboData,
});

export const updateComboSuccess = () => ({
    type: types.UPDATE_COMBO_SUCCESS,
});

export const updateComboError = (error) => ({
    type: types.UPDATE_COMBO_ERROR,
    payload: error,
});

export const deleteComboStart = (comboId) => ({
    type: types.DELETE_COMBO_START,
    payload: comboId,
});

export const deleteComboSuccess = (comboId) => ({
    type: types.DELETE_COMBO_SUCCESS,
    payload: comboId,
});

export const deleteComboError = (error) => ({
    type: types.DELETE_COMBO_ERROR,
    payload: error,
});

export const getcomboByIdStart = (comboId) => ({
    type: types.GET_COMBO_BYID_START,
    payload: comboId,
});

export const getcomboByIdSuccess = (comboId) => ({
    type: types.GET_COMBO_BYID_SUCCESS,
    payload: comboId,
});

export const getcomboByIdError = (error) => ({
    type: types.GET_COMBO_BYID_ERROR,
    payload: error,
})