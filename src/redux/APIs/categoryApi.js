import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadCategoryApi = async () => await axios.get(`http://localhost:9091/api/category`, {headers: headersParam});

export const addNewCategoryApi = async (newCategory) => await axios.post(`http://localhost:9091/api/category/create`, newCategory, { headers: headersParam });

export const updateCategoryApi = async (updateCategory) => await axios.patch(`http://localhost:9091/api/category/${updateCategory.id}`, updateCategory, { headers: headersParam });

export const deleteCategoryApi = async (deleteCategory) => await axios.delete(`http://localhost:9091/api/category/${deleteCategory.id}`, { headers: headersParam });

export const changeStatusApi = async (changeStatus) => await axios.patch(`http://localhost:9091/api/category/status/${changeStatus.id}`, changeStatus, { headers: headersParam});

export const getSingleCategoryApi = async (singleCategory) => await axios.get(`http://localhost:9091/api/category/${singleCategory}`, { headers: headersParam });

export const loadStocksApi = async () => await axios.get(`http://localhost:9091/api/category/stock`, { headers: headersParam});
