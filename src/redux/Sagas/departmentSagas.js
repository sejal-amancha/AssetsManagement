import * as types from "../ActionTypes/departmentActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";


import {
    loadDepartmentSuccess,
    loadDepartmentError,
    addnewDepartmentSuccess,
    addnewDepartmentError,
    getSingleDepartmentSuccess,
    getSingleDepartmentError,
    updateDepartmentSuccess,
    updateDepartmentError,
    deleteDepartmentSuccess,
    deleteDepartmentError,
} from '../Actions/departmentActions';

import {
    loadDepartmentsApi,
    addNewDepartmentApi,
    updateDepartmentApi,
    getSingleDepartmentApi,
    deleteDepartmentApi,
} from '../APIs/departmentApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

export function* onLoadDepartmentStartAsync() {
    try {
         const response = yield call(loadDepartmentsApi)
         if (response.data.success === true) {
             yield put(loadDepartmentSuccess(response.data));    
         } 
    } catch (error) {
         yield put(loadDepartmentError(error.response));
    }
}

export function* onAddNewDepartmentStartAsync({ payload }) {
    try {
        const response = yield call(addNewDepartmentApi, payload)
        if (response.data.success === true) {
            yield put(addnewDepartmentSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
        //  else {
        //     if (response.data.errors.categoryName) {
        //         Toast.fire({
        //             icon: "error",
        //             title: response.data.errors.categoryName,
        //         }) 
        //     } else {
        //         Toast.fire({
        //             icon: "error",
        //             title: response.data.errors.description,
        //         }) 
        //     }
           
        // }
    } catch (error) {
        yield put(addnewDepartmentError(error.response));
    }
}

export function* onGetSingleDepartmentStartAsync({ payload }) {
    try {
        const response = yield call(getSingleDepartmentApi, payload)
        if (response.data.success === true) {
            yield put(getSingleDepartmentSuccess(response.data.departmentData));
        }
    } catch (error) {
        yield put(getSingleDepartmentError(error.response));
    }
}

export function* onUpdateDepartmentStartAsync({ payload }) {
    try {
        const response = yield call(updateDepartmentApi, payload)
        if (response.data.success === true) {
            yield put(updateDepartmentSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                // title: response.data.errors.category_name,
            });
        }
    } catch (error) {
        yield put(updateDepartmentError(error.response));
    }
}

export function* onDeleteDepartmentStartAsync({ payload }) {
    try {
        const response = yield call(deleteDepartmentApi, payload)
        if (response.data.success === true) {
            yield put(deleteDepartmentSuccess(response.data));
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
        yield put(deleteDepartmentError(error.response));
    }
}

  
export function* onLoadDepartment() {
    yield takeLatest(types.LOAD_DEPARTMENT_START, onLoadDepartmentStartAsync);
}

export function* onAddNewDepartment() {
    yield takeLatest(types.ADD_NEW_DEPARTMENT_START, onAddNewDepartmentStartAsync);
}

export function* onSingleDepartment() {
    yield takeLatest(types.GET_SINGLE_DEPARTMENT_START, onGetSingleDepartmentStartAsync);
}

export function* onUpdateDepartment() {
    yield takeLatest(types.UPDATE_DEPARTMENT_START, onUpdateDepartmentStartAsync);
}

export function* onDeleteDepartment() {
    yield takeLatest(types.DELETE_DEPARTMENT_START, onDeleteDepartmentStartAsync);
}

const departmentSagas = [
    fork(onLoadDepartment),
    fork(onAddNewDepartment),
    fork(onSingleDepartment),
    fork(onUpdateDepartment),
    fork(onDeleteDepartment),
];

export default function* departmentSaga() {
    yield all([...departmentSagas]);
    }