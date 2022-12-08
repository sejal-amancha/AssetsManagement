import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadComboApi = async () => await axios.get(`http://localhost:9091/api/employee/assignitem/getall`, { headers: headersParam });

export const getSingleComboApi = async (singleCombo) => await axios.get(`http://localhost:9091/api/employee/${singleCombo}`, { headers: headersParam });

export const getItembyCategoryApi = async () => await axios.get(`http://localhost:9091/api/category/item-list`, { headers: headersParam});
