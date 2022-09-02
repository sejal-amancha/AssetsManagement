import * as types from "../ActionTypes/allocationActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadAllocationSuccess,
    loadAllocationError,
    newAllocationError,
    newAllocationSuccess,
    updateAllocationSuccess,
    updateAllocationError,
    deleteAllocationSuccess,
    deleteAllocationError,

} from '../Actions/allocationActions';

import {
    deleteAllocationApi,
    loadAllocationApi, 
    newAllocationApi,
    updateAllocationApi,
} from '../APIs/allocationApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

export function* onLoadAllocationStartAsync() {
    try {
         const response = yield call(loadAllocationApi)
         if (response.data.success === true) {
             yield put(loadAllocationSuccess(response.data));
         } 
    } catch (error) {
         yield put(loadAllocationError(error.response));
    }
 }

 export function* onNewAllocationStartAsync({ payload }) {
    try {
        const response = yield call(newAllocationApi, payload)
        if (response.data.success === true) {
            yield put(newAllocationSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.errors.employee_id,
            });
        }
    } catch (error) {
        yield put(newAllocationError(error.response));
    }
 }

 export function* onUpdateAllocationStartAsync({ payload }) {
    try {
        const response = yield call(updateAllocationApi, payload)
        if (response.data.success === true) {
            yield put(updateAllocationSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.errors.employee_id,
            });
        }
    } catch (error) {
        yield put(updateAllocationError(error.response));
    }
 }


export function* onDeleteAllocationStartAsync({ payload }) {
    try {
        const response = yield call(deleteAllocationApi, payload) 
        if (response.data.success === true) {
            yield put(deleteAllocationSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteAllocationError(error.response));
    }
}

export function* onLoadAllocations() {
    yield takeLatest(types.LOAD_ALLOCATIONS_START, onLoadAllocationStartAsync);
}

export function* onNewAllocation() {
    yield takeLatest(types.NEW_ALLOCATION_START, onNewAllocationStartAsync);
}

export function* onUpdateAllocation() {
    yield takeLatest(types.UPDATE_ALLOCATION_START, onUpdateAllocationStartAsync);
}

export function* onDeleteAllocation() {
    yield takeLatest(types.DELETE_ALLOCATION_START, onDeleteAllocationStartAsync);
}

const allocationSagas = [
    fork(onLoadAllocations), 
    fork(onNewAllocation),
    fork(onUpdateAllocation),
    fork(onDeleteAllocation),
];

export default function* allocationSaga() {
yield all([...allocationSagas]);
}