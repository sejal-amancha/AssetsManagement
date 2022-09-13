import * as types from '../ActionTypes/categoryActionTypes';

export const loadCategoriesStart = () => ({
    type: types.LOAD_CATEGORIES_START,
});

export const loadCategoriesSuccess = (categories) => ({
    type: types.LOAD_CATEGORIES_SUCCESS,
    payload: categories.data,
});
  
export const loadCategoriesError = (error) => ({
    type: types.LOAD_CATEGORIES_ERROR,
    payload: error,
});

export const addnewCategoryStart = (newCategory) => ({
    type: types.ADD_NEW_CATEGORY_START,
    payload: newCategory,
});

export const addnewCategorySuccess = () => ({
    type: types.ADD_NEW_CATEGORY_SUCCESS,
});

export const addnewCategoryError = (error) => ({
    type: types.ADD_NEW_CATEGORY_ERROR,
    payload: error,
});

export const updateCategoryStart = (updateCategory) => ({
    type: types.UPDATE_CATEGORY_START,
    payload: updateCategory,
});

export const updateCategorySuccess = () => ({
    type: types.UPDATE_CATEGORY_SUCCESS,
});

export const updateCategoryError = (error) => ({
    type: types.UPDATE_CATEGORY_ERROR,
    payload: error,
});

export const getSingleCategoryStart = (singleCategory) => ({
    type: types.GET_SINGLE_CATEGORY_START,
    payload: singleCategory,
});

export const getSingleCategorySuccess = (singleCategory) => ({
    type: types.GET_SINGLE_CATEGORY_SUCCESS,
    payload: singleCategory,
});

export const getSingleCategoryError = (error) => ({
    type: types.GET_SINGLE_CATEGORY_ERROR,
    payload: error,
})

export const deleteCategoryStart = (deleteCategory) => ({
    type: types.DELETE_CATEGORY_START,
    payload: deleteCategory,
});

export const deleteCategorySuccess = (deleteCategory) => ({
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: deleteCategory,
});

export const deleteCategoryError = (error) => ({
    type: types.DELETE_CATEGORY_ERROR,
    payload: error,
});

export const categoryStatusChangeStart = (changeStatus) => ({
    type: types.CATEGORY_STATUS_CHANGE_START,
    payload: changeStatus,
});

export const categoryStatusChangeSuccess = () => ({
    type: types.CATEGORY_STATUS_CHANGE_SUCCESS,  
});

export const categoryStatusChangeError = (error) => ({
    type: types.CATEGORY_STATUS_CHANGE_ERROR,
    payload: error,
});

export const loadStocksStart = () => ({
    type: types.LOAD_STOCKS_START,
});

export const loadStocksSuccess = (stocks) => ({
    type: types.LOAD_STOCKS_SUCCESS,
    payload: stocks,
});

export const loadStocksError = (error) => ({
    type: types.LOAD_STOCKS_ERROR,
    payload: error,
})