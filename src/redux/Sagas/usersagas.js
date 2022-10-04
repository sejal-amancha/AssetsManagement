import * as types from "../ActionTypes/actionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import crypto from "crypto-js";
// require("dotenv").config();
// import encrypt from '../../crypto'
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
    getSingleEmployeeAssignemntSuccess,
    getSingleEmployeeAssignemntError,
} from "../Actions/actions";

import { 
    loadUsersApi, 
    adminLoginApi, 
    addEmployeeApi, 
    adminChangePassApi, 
    updateEmployeeApi, 
    deleteEmployeeApi, 
    getSingleEmployeeApi, 
    getSingleEmployeeAssignmentApi } from "../APIs/api";

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
        if (response.data.message === "Login successful") {
            sessionStorage.setItem("ADMIN", JSON.stringify(response.data.data.token));
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
        sessionStorage.removeItem("ADMIN");
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
        if (response.data.success === true) {
            yield put(addNewEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            if (response.data.errors.firstName) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.firstName,
                });
            } else if (response.data.errors.last_name) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.last_name,
                });
            } else if (response.data.errors.lastName) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.lastName,
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
            } else if (response.data.errors.confirmPassword) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.confirmPassword,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.email,
                });
            }
        }
    } catch (error) {
        yield put(addNewEmployeeError(error.response));
    }
}

export function* onUpdateEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(updateEmployeeApi, payload);
        if (response.data.success === true) {
            yield put(updateEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            if (response.data.errors.firstName) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.firstName,
                });
            } else if (response.data.errors.last_name) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.last_name,
                });
            } else if (response.data.errors.lastName) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.lastName,
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
            } else if (response.data.errors.confirmPassword) {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.confirmPassword,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.email,
                });
            }
        }
    } catch (error) {
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

// const encrypt = (id) => {
//     const encryptedId = crypto.AES.encrypt(id, process.env.REACT_APP_SECRET_KEY).toString();
//     console.log("--->",encryptedId);
//     return encryptedId;
// };

export function* onSigleEmployeeStartAsync({ payload }) {
    // const ID = encrypt(payload);
    try {
        const response = yield call(getSingleEmployeeApi, payload)     
        if (response.data.success === true) {
            yield put(getSingleEmployeeSuccess(response.data.employeeData));
        }
    } catch (error) {
        yield put(getSingleEmployeeError(error.response));
    }
}

export function* onSingleEmployeeAssignStartAsync({ payload }) {
    try {
        const response = yield call(getSingleEmployeeAssignmentApi, payload);
        if (response.data.success === true) {
            yield put(getSingleEmployeeAssignemntSuccess(response.data.data));
        }
    } catch (error) {
        yield put(getSingleEmployeeAssignemntError(error.response));
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

export function* onGetSingleEmployeeAssign() {
    yield takeLatest(types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_START, onSingleEmployeeAssignStartAsync);
}

export function* onDeleteEmployee() {
    yield takeLatest(types.DELETE_EMPLOYEE_START, onDeleteEmployeeStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onAdminLogin), fork(onAdminLogout), fork(onAddNewEmployee), fork(onAdminChangePass), fork(onUpdateEmployee), fork(onGetSingleEmployee), fork(onDeleteEmployee), fork(onGetSingleEmployeeAssign)];

export default function* userSaga() {
    yield all([...userSagas]);
}
