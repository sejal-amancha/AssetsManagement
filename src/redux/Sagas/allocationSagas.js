import * as types from "../ActionTypes/assignItemActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    newAssignSuccess,
    newAssignError,
} from '../Actions/assignItemActions';

import {
    newAllocationApi,
} from '../APIs/allocationApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

export function* onNewAllocationStartAsync({ payload }) {
    try {
        const response = yield call(newAllocationApi, payload)
        if (response.data.success === true) {
            yield put(newAssignSuccess(response.data));
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
        yield put(newAssignError(error.response));
    }
 }

export function* onNewAllocation() {
    yield takeLatest(types.NEW_ASSIGN_START, onNewAllocationStartAsync);
}

const allocationSagas = [
    fork(onNewAllocation),
];

export default function* allocationSaga() {
yield all([...allocationSagas]);
}