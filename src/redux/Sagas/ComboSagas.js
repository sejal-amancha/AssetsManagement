import * as types from "../ActionTypes/comboActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    loadComboApi, 
} from '../APIs/comboApi';

import {  
    loadComboSuccess,
    loadComboError,
 
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

export function* onLoadCombo() {
    yield takeLatest(types.LOAD_COMBO_START, onLoadComboStartAsync);
}

const comboSagas = [
   fork(onLoadCombo),
];

export default function* comboSaga() {
yield all([...comboSagas]);
}