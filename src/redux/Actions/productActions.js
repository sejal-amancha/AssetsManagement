import * as types from '../ActionTypes/productActionTypes';

export const loadProductsStart = () => ({
    type: types.LOAD_PRODUCTS_START,
});

export const loadProductsSuccess = (productss) => ({
    type: types.LOAD_PRODUCTS_SUCCESS,
    payload: productss.data,
});
  
export const loadProductsError = (error) => ({
    type: types.LOAD_PRODUCTS_ERROR,
    payload: error,
});

export const addnewProductStart = (newProduct) => ({
    type: types.ADD_NEW_PRODUCT_START,
    payload: newProduct,
});

export const addnewProductSuccess = () => ({
    type: types.ADD_NEW_PRODUCT_SUCCESS,
});

export const addnewProductError = (error) => ({
    type: types.ADD_NEW_PRODUCT_ERROR,
    payload: error,
})

export const updateProductStart = (updateProduct) => ({
    type: types.UPDATE_PRODUCT_START,
    payload: updateProduct,
});

export const updateProductSuccess = () => ({
    type: types.UPDATE_PRODUCT_SUCCESS,
});

export const updateProductError = (error) => ({
    type: types.UPDATE_PRODUCT_ERROR,
    payload: error,
});

export const getSingleProductStart = (singleProduct) => ({
    type: types.GET_SINGLE_PRODUCT_START,
    payload: singleProduct,
});

export const getSingleProductSuccess = (singleProduct) => ({
    type: types.GET_SINGLE_PRODUCT_SUCCESS,
    payload: singleProduct,
});

export const getSingleProductError = (error) => ({
    type: types.GET_SINGLE_PRODUCT_ERROR,
    payload: error,
})

export const deleteProductStart = (deleteProduct) => ({
    type: types.DELETE_PRODUCT_START,
    payload: deleteProduct,
});

export const deleteProductSuccess = (deleteProduct) => ({
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: deleteProduct,
});

export const deleteProductError = (error) => ({
    type: types.DELETE_PRODUCT_ERROR,
    payload: error,
});