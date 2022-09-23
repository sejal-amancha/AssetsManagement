import * as types from "../ActionTypes/actionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadUsersSuccess,
    loadUsersError,
    adminLoginSuccess,
    adminLoginError,
    adminLogoutSuccess,
    adminLogoutError,
    addNewEmployeeSuccess,
    addNewEmployeeError,
    adminChangePasswordSuccess,
    adminChangePasswordError,
    updateEmployeeSuccess,
    updateEmployeeError,
    deleteEmployeeSuccess,
    deleteEmployeeError,
    adminLogoutStart,
    getSingleEmployeeSuccess,
    getSingleEmployeeError,
} from "../Actions/actions";

import { loadUsersApi, adminLoginApi, addEmployeeApi, adminChangePassApi, updateEmployeeApi, deleteEmployeeApi, getSingleEmployeeApi } from "../APIs/api";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.data.success === true) {
            yield put(loadUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUsersError(error.response));
    }
}

export function* onAdminLoginStartAsync({ payload }) {
    try {
        const response = yield call(adminLoginApi, payload);
        if (response.data.success === true) {
            localStorage.setItem("ADMIN", JSON.stringify(response.data.data.token));
            yield put(adminLoginSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
            return response;
        }
    } catch (error) {
        yield put(adminLoginError(error.response));
    }
}

export function* onAdminChangePassAsync({ payload }) {
    try {
        const response = yield call(adminChangePassApi, payload);
        if (response.data.success === true) {
            yield put(adminChangePasswordSuccess(response.data));
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
        yield put(adminChangePasswordError(error.response));
    }
}

export function* onAdminLogoutStartAsync() {
    try {
        localStorage.removeItem("ADMIN");
        const response = yield call(adminLogoutStart);
        if (response.data.success === true) {
            yield put(adminLogoutSuccess(response.data));
        }
    } catch (error) {
        yield put(adminLogoutError(error.response));
    }
}

export function* onAddNewEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(addEmployeeApi, payload);
        if (response.data.success === true ) {
            yield put(addNewEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            if (response.data.errors.first_name) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.first_name,
                });
            } else if (response.data.errors.last_name) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.last_name,
                });
            } else if (response.data.errors.email) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.email,
                });
            } else if (response.data.errors.phone) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.phone,
                });
            } else if (response.data.errors.password) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.password,
                });
            } else if (response.data.errors.confirm_password) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.confirm_password,
                });
            }  else {
                Toast.fire({
                    icon: "error",
                    title: response.data.message,
                });
            } 
        }
    } catch (error) {
        yield put(addNewEmployeeError(error.response));
    }
}


export  function* onUpdateEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(updateEmployeeApi, payload);
        if (response.data.success === true) {
            yield put(updateEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
        // else {
        //     if (response.data.errors.last_name) {
        //         Toast.fire({
        //             icon: "error",
        //             title: response.data.errors.last_name,
        //         });
        //     }     
        //     else if (response.data.errors.first_name) {
        //         Toast.fire({
        //             icon: "error",
        //             title: response.data.errors.first_name,
        //         })
        //     } 
            else {
                Toast.fire({
                    icon: "error",
                    title: response.data.message,
                })
            // }
    }} catch (error) {
        yield put(updateEmployeeError(error.response));
    }
}

export function* onDeleteEmployeeStartAsync(employeeId) {
    try {
        const response = yield call(deleteEmployeeApi, employeeId);
        if (response.data.success === true) {
            yield put(deleteEmployeeSuccess(employeeId));
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
        yield put(deleteEmployeeError(error.response));
    }
}

export function* onSigleEmployeeStartAsync ({ payload }) {
    try {
        const response = yield call(getSingleEmployeeApi, payload)
        if (response.data.success === true) {
            yield put(getSingleEmployeeSuccess(response.data.employeeData));
        }
    } catch (error) {
        yield put(getSingleEmployeeError(error.response));
    }
}

export function* onAdminLogin() {
    yield takeLatest(types.ADMIN_LOGIN_START, onAdminLoginStartAsync);
}

export function* onAdminChangePass() {
    yield takeLatest(types.ADMIN_CHANGE_PASSWORD_START, onAdminChangePassAsync);
}

export function* onAdminLogout() {
    yield takeLatest(types.ADMIN_LOGOUT_START, onAdminLogoutStartAsync);
}

export function* onLoadUsers() {
    yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onAddNewEmployee() {
    yield takeLatest(types.ADD_NEW_EMPLOYEE_START, onAddNewEmployeeStartAsync);
}

export function* onUpdateEmployee() {
    yield takeLatest(types.UPDATE_EMPLOYEE_START, onUpdateEmployeeStartAsync);
}

export function* onGetSingleEmployee() {
    yield takeLatest(types.GET_SINGLE_EMPLOYEE_START, onSigleEmployeeStartAsync);
}

export function* onDeleteEmployee() {
    yield takeLatest(types.DELETE_EMPLOYEE_START, onDeleteEmployeeStartAsync);
}

const userSagas = [
    fork(onLoadUsers), 
    fork(onAdminLogin), 
    fork(onAdminLogout), 
    fork(onAddNewEmployee), 
    fork(onAdminChangePass), 
    fork(onUpdateEmployee), 
    fork(onGetSingleEmployee),
    fork(onDeleteEmployee)];

export default function* userSaga() {
    yield all([...userSagas]);
}
