import * as types from '../ActionTypes/allocationActionTypes';

export const loadAllocationStart = () => ({
    type: types.LOAD_ALLOCATIONS_START,
});

export const loadAllocationSuccess = (allocations) => ({
    type: types.LOAD_ALLOCATIONS_SUCCESS,
    payload: allocations.data,
});
  
export const loadAllocationError = (error) => ({
    type: types.LOAD_ALLOCATIONS_ERROR,
    payload: error,
});

export const newAllocationStart = (newAllocationId) => ({
    type: types.NEW_ALLOCATION_START,
    payload: newAllocationId,
});

export const newAllocationSuccess = () => ({
    type: types.NEW_ALLOCATION_SUCCESS,
});

export const newAllocationError = (error) => ({
    type: types.NEW_ALLOCATION_ERROR,
    payload: error,
});

export const updateAllocationStart = (uAllocationId) => ({
    type: types.UPDATE_ALLOCATION_START,
    payload: uAllocationId,
});

export const updateAllocationSuccess = () => ({
    type: types.UPDATE_ALLOCATION_SUCCESS,
});

export const updateAllocationError = (error) => ({
    type: types.UPDATE_ALLOCATION_ERROR,
    payload: error,
});

export const deleteAllocationStart = (deleteAllocation) => ({
    type: types.DELETE_ALLOCATION_START,
    payload: deleteAllocation,
});

export const deleteAllocationSuccess = () => ({
    type: types.DELETE_ALLOCATION_SUCCESS,
});

export const deleteAllocationError = (error) => ({
    type: types.DELETE_ALLOCATION_ERROR,
    payload: error,
})