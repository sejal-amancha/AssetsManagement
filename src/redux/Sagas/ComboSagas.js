import * as types from "../ActionTypes/comboActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    createComboApi, 
    deleteComboApi, 
    loadComboApi, 
    updateComboApi,
    getSingleComboApi,   
} from '../APIs/comboApi';

import {  
    createComboSuccess, 
    createComboError, 
    loadComboSuccess,
    loadComboError,
    updateComboSuccess,
    updateComboError,
    deleteComboSuccess,
    deleteComboError,
    getcomboByIdSuccess,
    getcomboByIdError,  
} from '../Actions/comboActions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

export function* onLoadComboStartAsync() {
    try {
        const response = yield call(loadComboApi)
        if (response.data.success === true) {
            yield put(loadComboSuccess(response.data));
        } 
    } catch (error) {
        yield put(loadComboError(error.response));
    }
}

export function* onCreateComboStartAsync({ payload }) {
    try {
        const response = yield call(createComboApi, payload) 
        if (response.data.success === true) {
            yield put(createComboSuccess(response.data));
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
        yield put(createComboError(error.response));
    }
}

export function* onUpdateComboStartAsync({payload}) {
    try {
        const response = yield call(updateComboApi, payload)
        if (response.data.success === true ) {
            yield put(updateComboSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: "Combo updated Successfully!",
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(updateComboError(error.response))
    }
}

export function* onSingleComboStartAsync({payload}) {
    try {
        const response = yield call(getSingleComboApi, payload) 
        if (response.data.success === true) {
            yield put(getcomboByIdSuccess(response.data.comboDetails));
        }
    } catch (error) {
        yield put(getcomboByIdError(error.response));
    }
}

export function* onDeleteComboStartAsync({payload}) {
    try {
        const response = yield call(deleteComboApi, payload)
        if (response.data.success === true ) {
            yield put(deleteComboSuccess(response.data));
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
        yield put(deleteComboError(error.response));
    }
}

export function* onLoadCombo() {
    yield takeLatest(types.LOAD_COMBO_START, onLoadComboStartAsync);
}
export function* oncreateCombo() {
    yield takeLatest(types.CREATE_COMBO_START, onCreateComboStartAsync);
}

export function* onUpdateCombo() {
    yield takeLatest(types.UPDATE_COMBO_START, onUpdateComboStartAsync);
}

export function* onDeleteCombo() {
    yield takeLatest(types.DELETE_COMBO_START, onDeleteComboStartAsync);
}

export function* onSingleCombo() {
    yield takeLatest(types.GET_COMBO_BYID_START, onSingleComboStartAsync);
}

const comboSagas = [
   fork(onLoadCombo),
   fork(oncreateCombo),
   fork(onUpdateCombo),
   fork(onDeleteCombo),
   fork(onSingleCombo),
];

export default function* comboSaga() {
yield all([...comboSagas]);
}