import * as types from "../ActionTypes/productActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    loadProductsSuccess,
    loadProductsError,
    addnewProductSuccess,
    addnewProductError,
    updateProductSuccess,
    updateProductError,
    deleteProductError,
    deleteProductSuccess,
    getSingleProductSuccess,
    getSingleProductError,
} from '../Actions/productActions';

import {
    loadProductsApi,
    addNewProductApi,
    updateProductApi,
    deleteProductApi,
    getSingleProductApi,
} from '../APIs/productApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

function* onLoadProductsStartAsync() {
    try {
        const response = yield call(loadProductsApi);
        if (response.data.success === true) {
            yield put(loadProductsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadProductsError(error.response));
    }
}

function* onAddNewProductStartAsync({ payload }) {
    try {
        const response = yield call(addNewProductApi, payload)
        if (response.data.success === true) {
            yield put(addnewProductSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(addnewProductError(error.response));
    }
}

function* onUpdateProductStartAsync({ payload }) {
    try {
        const response = yield call(updateProductApi, payload)
        if (response.data.success === true) {
            yield put(updateProductSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else { 
            if (payload.product_name === '') {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.product_name,
                });
            }  else if (payload.category_id === '') {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.category_id,
                });
            } else if (payload.product_description === '') {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.product_description,
                });
            } else if (payload.purchase_date === '') {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.purchase_date,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: response.data.errors.product_cost,
                });
            }
        }
    } catch (error) {
            yield put(updateProductError(error.response));
    }
}

function* onGetSingleProductStartAsync({ payload }) {
    try {
        const response = yield call(getSingleProductApi, payload)
        if (response.data.success === true) {
            yield put(getSingleProductSuccess(response.data.itemData));
        }
    } catch (error) {
        yield put(getSingleProductError(error.response));
    }
}

function* onDeleteProductStartAsync({ payload }) {
    try {
        const response = yield call(deleteProductApi, payload)
        if (response.data.success === true) {
            yield put(deleteProductSuccess(response.data));
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
        yield put(deleteProductError(error.response));
    }
}

export function* onLoadProducts() {
    yield takeLatest(types.LOAD_PRODUCTS_START, onLoadProductsStartAsync);
}

export function* onAddnewProduct () {
    yield takeLatest(types.ADD_NEW_PRODUCT_START, onAddNewProductStartAsync);
}

export function* onUpdateProduct() {
    yield takeLatest(types.UPDATE_PRODUCT_START, onUpdateProductStartAsync);
}

export function* onDeleteProduct() {
    yield takeLatest(types.DELETE_PRODUCT_START, onDeleteProductStartAsync);
}

export function* onSingleProduct() {
    yield takeLatest(types.GET_SINGLE_PRODUCT_START, onGetSingleProductStartAsync);
}

const productSagas = [
    fork(onLoadProducts), 
    fork(onAddnewProduct),
    fork(onUpdateProduct),
    fork(onDeleteProduct),
    fork(onSingleProduct),
];

export default function* productSaga() {
yield all([...productSagas]);
}





